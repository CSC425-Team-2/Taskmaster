using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace taskmaster_api.Migrations
{
    public partial class AddUsernameToTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "username",
                table: "Tasks");
        }
    }
}
