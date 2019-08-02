using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using web.Models;

namespace web.AppDbContext
{
    public class MainDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Gender> Genders { get; set; }

        public MainDbContext(DbContextOptions opt) : base(opt) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Student>()
                .HasOne(p => p.Gender)
                .WithMany(b => b.Students)
                .IsRequired(true)
                .HasForeignKey(s => s.GenderId);
        }

        /*
        public override int SaveChanges()
        {
            //ReplaceEmptyGuidsToNull();
            return base.SaveChanges();
        }

        private void ReplaceEmptyGuidsToNull()
        {
            var students = this.ChangeTracker.Entries<Student>()
              .Where(x => x.State == EntityState.Modified || x.State == EntityState.Added && x.Entity != null);

            foreach (Student student in students)
                string.IsNullOrWhiteSpace(student.Guid) ? null : s;
        }*/
    }
}

