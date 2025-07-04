﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using task_management.Server.Models;

namespace task_management.Server.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Models.TaskStatus> TaskStatuses { get; set; }
        public DbSet<TaskCategory> TaskCategories { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
