using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AxonApparel.Domain
{
    public class Employee
    {
        public int EmpId { get; set; }

        public string EmpName { get; set; }

        public string EmpNo { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }


        public int CompanyUnit { get; set; }
        public string CompanyUnitName { get; set; }

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        public int DesignationId { get; set; }

        public string DesignationName { get; set; }

        public int CityId { get; set; }

        public string CityName { get; set; }

        public string Email { get; set; }

        public string PhoneNo { get; set; }

        public string IsActive { get; set; }

        public string PieceRate { get; set; }

        public string ProdEmployee { get; set; }
        public int CountEmpId { get; set; }

        public string Imgpath { get; set; }
    }
}