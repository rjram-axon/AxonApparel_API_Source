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
    public class DesignationBusiness:IDesignationBusiness
    {
        private IDesignationRepository designationRepo = new DesignationRepository();


        public Response<IEnumerable<Domain.Designation>> GetDesignation()
        {
            try
            {
                var couList = designationRepo.GetDataListAll();
                return new Response<IEnumerable<Domain.Designation>>(couList.Select(m => new Domain.Designation
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Id = m.Id,
                    DesignationName = m.DesignationName, 
                    Employee=m.Employee,
                    Employeeid=m.Employeeid,
                    Department=m.Department,
                    Departmentid=m.Departmentid,
                    Address=m.Address
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Designation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Designation> GetDesignationId(int DesignationId)
        {
            try
            {
                var cou = designationRepo.GetDataById(DesignationId);
                return new Response<Domain.Designation>(new Domain.Designation
                {
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    Id = cou.Id,
                    DesignationName= cou.Designation1,                    
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Designation>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateDesignation(Domain.Designation DesignationAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(DesignationAdd.DesignationName)) return new Response<int>(0, Status.ERROR, "Given Name of Employee is empty");
                if (isNameAvailableAlready(DesignationAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given mode of Employee is already available");

                return new Response<int>(designationRepo.AddData(new Repository.Designation
                {
                    Id = DesignationAdd.Id,
                    Designation1 = DesignationAdd.DesignationName,                    
                    IsActive = DesignationAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateDesignation(Domain.Designation DesignationUpd)
        {
            if (string.IsNullOrEmpty(DesignationUpd.DesignationName)) return new Response<bool>(false, Status.ERROR, "Given CountryName of Country is empty");
            if (isNameAvailableAlready(DesignationUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given mode of shipment is already available");

            return new Response<bool>(designationRepo.UpdateData(new Repository.Designation
            {
                Id=DesignationUpd.Id,
                Designation1= DesignationUpd.DesignationName,                
                IsActive = DesignationUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Added Successfully");
        }

        public Response<bool> DeleteDesignation(int DesignationId)
        {
            return new Response<bool>(designationRepo.DeleteData(DesignationId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.Designation emp, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetDesignation().Value.Where(c => c.DesignationName.ToUpper() == emp.DesignationName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetDesignation().Value.Where(c => c.DesignationName.ToUpper() == emp.DesignationName.ToUpper() && c.Id!= emp.Id).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.Designation>> GetDesignationCheckItemDetails(int DesignationId)
        {
            try
            {
                var ProductEWO = designationRepo.GetRepDesignationCheckItemDetails(DesignationId);

                return new Response<IList<Domain.Designation>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Designation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
