using System.ComponentModel.DataAnnotations;

namespace InStock.Models
{
    public class Categoria
    {

        public int Id { get; set; }

        public string? Nome { get; set; }
        [Required]

        public bool? Ativo { get; set; }

    }
}
