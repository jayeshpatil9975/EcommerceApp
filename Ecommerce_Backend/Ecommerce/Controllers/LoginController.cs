using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Ecommerce_Framework.Models;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        public Dbcontext _context { get; }

        public LoginController(Dbcontext context, IConfiguration config)
        {
            _config = config;
            _context = context;
        }

        [HttpPost]
        public IActionResult LoginUser([FromBody] Customer loginUser)
        {
            IActionResult response = Unauthorized();
            dynamic user = ValidateUser(loginUser.Email, loginUser.Password);
            if (user != null)
            {
                var tokenstring = GenerateJsonToken(user);
                response = Ok(new { token = tokenstring });
            }

            return response;
        }

        public string GenerateJsonToken(dynamic user)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
             new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
             new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
             };


            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
            //return token;
        }

        public dynamic ValidateUser(string email, string password)
        {

            dynamic user = _context.Customers.Where(u => u.Email == email && u.Password == password).FirstOrDefault();
            if(user==null)
            {
                user = _context.Vendors.Where(u => u.Email == email && u.Password == password).FirstOrDefault();
            }
            return user;
        }


        [HttpGet]
        [Route("UserByEmail")]
        [AllowAnonymous]
        public dynamic GetUserByEmail(string userEmail)
        {
            dynamic currentUser = _context.Customers.Where(u => u.Email == userEmail).FirstOrDefault();
            if(currentUser==null)
            {
                currentUser = _context.Vendors.Where(u => u.Email == userEmail).FirstOrDefault();
            }
            return currentUser;
        }

        [HttpGet]
        [Route("AllEmails")]
        [AllowAnonymous]
        public IEnumerable<string> GetAllEmails()
        {
            IEnumerable<string> emails = _context.Customers.Select(u => u.Email).ToList().Union(_context.Vendors.Select(u => u.Email).ToList());
            return emails;
        }

        [HttpPut]
        [Route("ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetUserPassword([FromBody] Customer user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Customer checkEmailExist = null;

            checkEmailExist = _context.Customers.Where(u => u.Email == user.Email).FirstOrDefault();

            if (checkEmailExist != null)
            {
                checkEmailExist.Password = user.Password;
                await _context.SaveChangesAsync();
                return Ok(checkEmailExist);

            }
            else
            {
                Vendor checkEmail = null;
                checkEmail = _context.Vendors.Where(u => u.Email == user.Email).FirstOrDefault();
                if (checkEmail != null)
                {
                    checkEmail.Password = user.Password;
                    await _context.SaveChangesAsync();
                    return Ok(checkEmail);

                }
                else
                {
                    return BadRequest("Entered Email Id Does Not Exist");
                }
            }

        }

    }
}