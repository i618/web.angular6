using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace web.Models
{
    [Table("Students", Schema = "main")]
    public class Student
    {
        private string _guid = null;

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int GenderId { get; set; }

        [ForeignKey("GenderId")]
        public virtual Gender Gender { get; set; }

        public string GenderName => Gender?.Name;

        [Required, MaxLength(40)]
        public string FirstName { get; set; }

        [Required, MaxLength(40)]
        public string LastName { get; set; }

        [MaxLength(60), DisplayFormat(ConvertEmptyStringToNull = true)]
        public string Patronymic { get; set; }

        [MinLength(6), MaxLength(16), DisplayFormat(ConvertEmptyStringToNull = true)]
        public string Guid
        {
            get { return _guid; }
            set
            {
                _guid = string.IsNullOrWhiteSpace(value) ? null : value;
            }
        }
    }
}
