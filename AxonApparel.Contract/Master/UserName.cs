using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class UserName
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public int GroupId { get; set; }
        public string Grouptype { get; set; }
        public string Password { get; set; }
        public string ConPassword { get; set; }
        public int EmployeeId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public string ChangePass { get; set; }
        public string VCode { get; set; }
        public string Employee { get; set; }
        public string GroupName { get; set; }
        public bool Remember { get; set; }
        public int Roleid { get; set; }
        public int CompanyId { get; set; }
        public string LoginStatus { get; set; }
        public string LoginPC { get; set; }
        public int UnitId { get; set; }
        public int Multiple { get; set; }
        public List<UserName> UserStatusList { get; set; }
    }
}
