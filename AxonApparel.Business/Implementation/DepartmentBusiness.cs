using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;


namespace AxonApparel.Business
{
    public class DepartmentBusiness:IDepartmentBusiness
    {
        private IDepartmentRepository strrep = new DepartmentRepository();


        public Common.Response<IEnumerable<Domain.Department>> GetDepartment()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                return new Response<IEnumerable<Domain.Department>>(strlist.Select(m => new Domain.Department
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    DepartmentId = m.Id,
                    DepartmentName = m.Department1,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Department>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.Department> GetDepartmentId(int DepartmentId)
        {
            try
            {
                var str = strrep.GetDataById(DepartmentId);
                return new Response<Domain.Department>(new Domain.Department
                {
                    DepartmentName = str.Department1,
                    DepartmentId = str.Id,
                    IsActive = str.IsActive ? "TRUE" : "FALSE"
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Department>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateDepartment(Domain.Department DepartmentAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(DepartmentAdd.DepartmentName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Department is empty");
                if (isNameAvailableAlready(DepartmentAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Mode of Department is already available");

                return new Response<int>(strrep.AddData(new Repository.Department
                {
                    Id = DepartmentAdd.DepartmentId,
                    Department1 = DepartmentAdd.DepartmentName,
                    IsActive = DepartmentAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateDepartment(Domain.Department DepartmentUpd)
        {
            if (string.IsNullOrEmpty(DepartmentUpd.DepartmentName))
                return new Response<bool>(false, Status.ERROR, "Given Department is empty");
            if (isNameAvailableAlready(DepartmentUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Department is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Department
            {
                Department1 = DepartmentUpd.DepartmentName,
                Id = DepartmentUpd.DepartmentId,
                IsActive = DepartmentUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteDepartment(int DepartmentId)
        {
            return new Response<bool>(strrep.DeleteData(DepartmentId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Department store, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetDepartment().Value.Where(c => c.DepartmentName.ToUpper() == store.DepartmentName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetDepartment().Value.Where(c => c.DepartmentName.ToUpper() == store.DepartmentName.ToUpper() && c.DepartmentId != store.DepartmentId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<Domain.Department>> GetDepartmentCheckItemDetails(int DepartmentId)
        {
            try
            {
                var ProductEWO = strrep.GetRepDepartmentCheckItemDetails(DepartmentId);

                return new Response<IList<Domain.Department>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Department>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
