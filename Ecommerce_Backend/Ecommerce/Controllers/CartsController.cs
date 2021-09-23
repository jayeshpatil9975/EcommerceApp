using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class CartsController : ControllerBase
    {
        private readonly Dbcontext _context;

        public CartsController(Dbcontext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet("{id}")]
        [Route("CartByCustomerId")]
        public IEnumerable<Cart> GetCarts([FromQuery] int id)
        {
            IEnumerable<Cart> carts = _context.Carts.Where(c=>c.CustomerId==id).Include(p=>p.Product);
            return carts;
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        // PUT: api/Carts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart([FromRoute] int id, [FromBody] Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cart.CartId)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carts
        [HttpPost]
        public async Task<IActionResult> PostCart([FromBody] Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool customerId = _context.Carts.Any(c=>c.CustomerId==cart.CustomerId);
            bool productId = _context.Carts.Any(c=>c.ProductId==cart.ProductId);
            Cart existingcart = _context.Carts.Where(c=> c.CustomerId == cart.CustomerId && c.ProductId == cart.ProductId).FirstOrDefault();
            if(customerId && productId)
            {
                cart.Quantity = existingcart.Quantity + 1;
            }
            else
            {
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }


            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        [HttpGet("{customerId}/{productId}")]
        [Route("CartExisting")]
        [AllowAnonymous]
        public IActionResult CartExisting([FromQuery]int customerId,[FromQuery]int productId)
        {
            Cart cartexist = null;
            cartexist= _context.Carts.Where(c=>c.CustomerId==customerId && c.ProductId==productId).FirstOrDefault();
            if(cartexist!=null)
            {
                return Ok(cartexist);
            }
            return NotFound();
        }


        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartId == id);
        }


    }
}