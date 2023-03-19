using System.ComponentModel.DataAnnotations;


namespace InStock.Models
{
    public class Produto
    {
        public int Id { get; set; }

        public string? Nome { get; set; }
        [Required]

        public Categoria CategoriaID { get; set; }

        public int QtdMin { get; set; }
        public int Qtd { get; set; }
        public int QtdMax { get; set; }


        public bool? Ativo { get; set;}
    }
}
