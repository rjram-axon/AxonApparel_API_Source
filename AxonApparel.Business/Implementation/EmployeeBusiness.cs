using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class EmployeeBusiness:IEmployeeBusiness
    {
        private IEmployeeRepository employeeRepo = new EmployeeRepository();        

        public Response<IEnumerable<Domain.Employee>> GetEmployee()
        {
            try
            {
                var couList = employeeRepo.GetDataListAll();
                return new Response<IEnumerable<Domain.Employee>>(couList.Select(m => new Domain.Employee
                {
                    IsActive = (m.IsActive == null ? "" : m.IsActive),
                    EmpId = (m.EmpId == null ? 0 : m.EmpId),//m.EmployeeId,
                    EmpName = (m.EmpName == null ? "" : m.EmpName),//m.Employee1,
                    Address1 = (m.Address1 == null ? "" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "" : m.Address3),//m.Address3,
                    EmpNo = (m.EmpNo == null ? "" : m.EmpNo),//m.Address3,
                    CompanyUnit = (int)(m.CompanyUnit == null ? 0 : m.CompanyUnit),//(int)m.CompanyUnit,             
                    CompanyUnitName = (m.CompanyUnitName == null ? "" : m.CompanyUnitName),//m.CompanyUnit1.CompanyUnit1,
                    DepartmentName = (m.DepartmentName == null ? "" : m.DepartmentName),//m.Department.Department1,
                    DesignationName = (m.DesignationName == null ? "" : m.DesignationName),//m.Designation.Designation1,
                    CityName = (m.CityName == null ? "" : m.CityName),//m.City.City1,
                    Email = (m.Email == null ? "" : m.Email),//m.Email,
                    PhoneNo = (m.PhoneNo == null ? "" : m.PhoneNo),//m.PhoneNo,
                    PieceRate = (m.PieceRate == null ? "" : m.PieceRate),
                    ProdEmployee = (m.ProdEmployee == null ? "" : m.ProdEmployee),
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    DesignationId = (int)(m.DesignationId == null ? 0 : m.DesignationId),//m.Designation.Designation1,
                    DepartmentId = (int)(m.DepartmentId == null ? 0 : m.DepartmentId),//m.Designation.Designation1,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Employee>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<Domain.Employee>> GetMerch()
        {
            try
            {
                var couList = employeeRepo.GetMerch();
                return new Response<IEnumerable<Domain.Employee>>(couList.Select(m => new Domain.Employee
                {
                    EmpId = (m.EmpId == null ? 0 : m.EmpId),//m.EmployeeId,
                    EmpName = (m.EmpName == null ? "" : m.EmpName),//m.Employee1,
                  
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Employee>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Employee>> GetManager()
        {
            try
            {
                var couList = employeeRepo.GetManager();
                return new Response<IEnumerable<Domain.Employee>>(couList.Select(m => new Domain.Employee
                {
                    EmpId = (m.EmpId == null ? 0 : m.EmpId),//m.EmployeeId,
                    EmpName = (m.EmpName == null ? "" : m.EmpName),//m.Employee1,

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Employee>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Employee> GetEmployeeId(int employeeId)
        {
            try
            {
                var cou = employeeRepo.GetDataById(employeeId);
                return new Response<Domain.Employee>(new Domain.Employee
                {
           
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    EmpId = (int)(cou.EmployeeId == null ? 0 : cou.EmployeeId),//m.EmployeeId,
                    EmpName = (cou.Employee1 == null ? "" : cou.Employee1),//m.Employee1,
                    EmpNo = (cou.EmpNo == null ? "" : cou.EmpNo),//m.Address3,
                    Address1 = (cou.Address1 == null ? "" : cou.Address1),//m.Address1,
                    Address2 = (cou.Address2 == null ? "" : cou.Address2),//m.Address2,
                    Address3 = (cou.Address3 == null ? "" : cou.Address3),//m.Address3,
                    CompanyUnit = (int)(cou.CompanyUnit == null ? 0 : cou.CompanyUnit),//(int)m.CompanyUnit,             
                    CompanyUnitName = "",//(cou.CompanyUnit1 == null ? "" : cou.CompanyUnit1.CompanyUnit1),//m.CompanyUnit1.CompanyUnit1,
                    DepartmentName = "",//(cou.Department == null ? "" : cou.Department.Department1),//m.Department.Department1,
                    DesignationName = "",//(cou.Designation == null ? "" : cou.Designation.Designation1),//m.Designation.Designation1,
                    DesignationId = (int)(cou.DesignationId == null ? 0 : cou.DesignationId),//m.Designation.Designation1,
                    DepartmentId = (int)(cou.DepartmentId == null ? 0 : cou.DepartmentId),//m.Designation.Designation1,
                    CityName = "",//(cou.City == null ? "" : cou.City.City1),//m.City.City1,
                    CityId = (int)(cou.CityId == null ? 0 : cou.CityId),//m.City.City1,
                    Email = (cou.Email == null ? "" : cou.Email),//m.Email,
                    PhoneNo = (cou.PhoneNo == null ? "" : cou.PhoneNo),//m.PhoneNo,
                    PieceRate = cou.PieceRate ? "TRUE" : "FALSE",
                    ProdEmployee = cou.ProdEmployee ? "TRUE" : "FALSE",
                    Imgpath = cou.Imgpath
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Employee>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateEmployee(Domain.Employee EmployeeAdd)
        {
            try
            {
                int? DepId = 0;

                if (EmployeeAdd.DepartmentId == 0)
                {
                    DepId = null;
                }
                else
                {
                    DepId = EmployeeAdd.DepartmentId;
                }
                int? desId = 0;

                if (EmployeeAdd.DesignationId == 0)
                {
                    desId = null;
                }
                else
                {
                    desId = EmployeeAdd.DesignationId;
                }
                int? Cumid = 0;

                if (EmployeeAdd.CompanyUnit == 0)
                {
                    Cumid = null;
                }
                else
                {
                    Cumid = EmployeeAdd.CompanyUnit;
                }

                int? CitId = 0;

                if (EmployeeAdd.CityId == 0)
                {
                    CitId = null;
                }
                else
                {
                    CitId = EmployeeAdd.CityId;
                }


                if (string.IsNullOrEmpty(EmployeeAdd.EmpName)) return new Response<int>(0, Status.ERROR, "Given Name of Employee is empty");
                if (isNameAvailableAlready(EmployeeAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given mode of Employee is already available");

                return new Response<int>(employeeRepo.AddData(new Repository.Employee
                {
                    EmployeeId=EmployeeAdd.EmpId,
                    Employee1 = EmployeeAdd.EmpName,
                    EmpNo = EmployeeAdd.EmpNo,
                    Address1=EmployeeAdd.Address1,
                    Address2 = EmployeeAdd.Address2,
                    Address3 = EmployeeAdd.Address3,
                    CompanyUnit=Cumid,//EmployeeAdd.CompanyUnit,
                    DepartmentId=DepId,//EmployeeAdd.DepartmentId,
                    DesignationId = desId,//EmployeeAdd.DesignationId,
                    Email=EmployeeAdd.Email,
                    PhoneNo=EmployeeAdd.PhoneNo,
                    CityId=CitId,//EmployeeAdd.CityId,
                    PieceRate = EmployeeAdd.PieceRate.ToUpper() == "TRUE",
                    ProdEmployee = EmployeeAdd.ProdEmployee.ToUpper() == "TRUE",
                    IsActive = EmployeeAdd.IsActive.ToUpper() == "TRUE",
                    Imgpath = EmployeeAdd.Imgpath
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateEmployee(Domain.Employee EmployeeUpd)
        {

            int? DepId = 0;

            if (EmployeeUpd.DepartmentId == 0)
            {
                DepId = null;
            }
            else
            {
                DepId = EmployeeUpd.DepartmentId;
            }
            int? desId = 0;

            if (EmployeeUpd.DesignationId == 0)
            {
                desId = null;
            }
            else
            {
                desId = EmployeeUpd.DesignationId;
            }
            int? Cumid = 0;

            if (EmployeeUpd.CompanyUnit == 0)
            {
                Cumid = null;
            }
            else
            {
                Cumid = EmployeeUpd.CompanyUnit;
            }

            int? CitId = 0;

            if (EmployeeUpd.CityId == 0)
            {
                CitId = null;
            }
            else
            {
                CitId = EmployeeUpd.CityId;
            }
            if (string.IsNullOrEmpty(EmployeeUpd.EmpName)) return new Response<bool>(false, Status.ERROR, "Given CountryName of Country is empty");
            if (isNameAvailableAlready(EmployeeUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given mode of shipment is already available");

            return new Response<bool>(employeeRepo.UpdateData(new Repository.Employee
            {
                EmployeeId = EmployeeUpd.EmpId,
                Employee1 = EmployeeUpd.EmpName,
                EmpNo=EmployeeUpd.EmpNo,
                Address1 = EmployeeUpd.Address1,
                Address2 = EmployeeUpd.Address2,
                Address3 = EmployeeUpd.Address3,
                CompanyUnit=Cumid,//EmployeeUpd.CompanyUnit,
                DepartmentId = DepId,//EmployeeUpd.DepartmentId,
                DesignationId = desId,//EmployeeUpd.DesignationId,
                Email = EmployeeUpd.Email,
                PhoneNo = EmployeeUpd.PhoneNo,
                CityId = CitId,//EmployeeUpd.CityId,
                PieceRate = EmployeeUpd.PieceRate.ToUpper() == "TRUE",
                ProdEmployee = EmployeeUpd.ProdEmployee.ToUpper() == "TRUE",
                IsActive = EmployeeUpd.IsActive.ToUpper() == "TRUE",
                Imgpath = EmployeeUpd.Imgpath
            }), Status.SUCCESS, "Added Successfully");
        }

        public Response<bool> DeleteEmployee(int EmployeeId)
        {
            return new Response<bool>(employeeRepo.DeleteData(EmployeeId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.Employee emp, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetEmployee().Value.Where(c => c.EmpName.ToUpper() == emp.EmpName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetEmployee().Value.Where(c => c.EmpName.ToUpper() == emp.EmpName.ToUpper() && c.EmpId!= emp.EmpId).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.Employee>> GetEmployeeCheckItemDetails(int EmployeeId)
        {
            try
            {
                var ProductEWO = employeeRepo.GetRepEmployeeCheckItemDetails(EmployeeId);

                return new Response<IList<Domain.Employee>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Employee>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
