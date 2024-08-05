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
    public class StoreSetupBusiness : IStoreSetupBusiness
    {
        IStoreSetupRepository strobj = new StoreSetupRepository();

        public Response<IEnumerable<EmpStoreSetup>> GetMainList(int employeeid, int storeid)
        {

            var strlist = strobj.GetMainList(employeeid, storeid);
            return new Response<IEnumerable<Domain.EmpStoreSetup>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }
        public Response<IEnumerable<EmpStoreSetup>> GetEmployeeDDl()
        {

            var strlist = strobj.GetEmployeeDDl();
            return new Response<IEnumerable<Domain.EmpStoreSetup>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }
        public Response<IEnumerable<EmpStoreSetup>> GetStoreDDL()
        {

            var strlist = strobj.GetStoreDDL();
            return new Response<IEnumerable<Domain.EmpStoreSetup>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }
        public Response<IEnumerable<EmpStoreSetup>> GetAddSetup()
        {

            var strlist = strobj.GetAddSetup();
            return new Response<IEnumerable<Domain.EmpStoreSetup>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }
        public Response<IEnumerable<EmpStoreSetup>> GetEditSetup(int id)
        {

            var strlist = strobj.GetEditSetup(id);
            return new Response<IEnumerable<Domain.EmpStoreSetup>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<IEnumerable<EmpStoreSetup>> GetStoreRights(int Userid, string Storetype, int Companyid)
        {

            var strlist = strobj.GetStoreRights(Userid, Storetype, Companyid);
            return new Response<IEnumerable<Domain.EmpStoreSetup>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<bool> CreateSetup(EmpStoreSetup SectionAdd)
        {
            var Details = new List<Emp_Store_Setup>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd.SetupList)
                {

                    Details.Add(new Emp_Store_Setup
                    {
                        Employeeid = details.Employeeid,
                        Storeid = details.Storeid,
                        Issue = details.Issue,
                        Receipt = details.Receipt,
                        Setupid = details.Setupid,
                    });
                }
            }


            var result = strobj.CreateSetup(Details);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");


        }
        public Response<bool> UpdateSetup(EmpStoreSetup SectionAdd)
        {
            var Details = new List<Emp_Store_Setup>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd.SetupList)
                {

                    Details.Add(new Emp_Store_Setup
                    {
                        Employeeid = details.Employeeid,
                        Storeid = details.Storeid,
                        Issue = details.Issue,
                        Receipt = details.Receipt,
                        Setupid = details.Setupid,
                    });
                }
            }


            var result = strobj.UpdateSetup(Details);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");


        }
        public Response<bool> DeleteSetup(EmpStoreSetup SectionAdd)
        {
            var Details = new List<Emp_Store_Setup>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd.SetupList)
                {

                    Details.Add(new Emp_Store_Setup
                    {
                        Employeeid = details.Employeeid,
                        Storeid = details.Storeid,
                        Issue = details.Issue,
                        Receipt = details.Receipt,
                        Setupid = details.Setupid,
                    });
                }
            }


            var result = strobj.DeleteSetup(Details);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");


        }


    }
}
