using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InStock.Models;

namespace InStock.Data
{
    public class Context : DbContext
    {
        public Context (DbContextOptions<Context> options)
            : base(options)
        {
        }

        public DbSet<Categoria> Categoria { get; set; } = default!;

        public DbSet<Produto>? Produto { get; set; }
    }
}
