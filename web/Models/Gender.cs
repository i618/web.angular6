using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    [Table("Gender", Schema = "main")]
    public class Gender
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public virtual List<Student> Students { get; set; }
    }
}
