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
    public class AlertSetupBusiness :IAlertSetupBusiness
    {

        IAlertSetupRepository strobj = new AlertSetupRepository();

        public Response<IEnumerable<Domain.AlertType>> GetDDlList(string Alerttype)
        {

            var strlist = strobj.GetDDlList(Alerttype);
            return new Response<IEnumerable<Domain.AlertType>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<IEnumerable<Domain.AlertType>> GetMainList(string Alerttype,int Alertid)
        {

            var strlist = strobj.GetMainList(Alerttype, Alertid);
            return new Response<IEnumerable<Domain.AlertType>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }


       
        public Response<IEnumerable<Domain.User_Grant_AlertRights>> GetAlertEditbyid(int Alertid)
        {

            var strlist = strobj.GetAlertEditbyid(Alertid);
            return new Response<IEnumerable<Domain.User_Grant_AlertRights>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<IEnumerable<Domain.User_Grant_AlertRights>> GetAlertDetails(string Alertname, string Category, string Orderno)
        {

            var strlist = strobj.GetAlertDetails(Alertname, Category, Orderno);
            return new Response<IEnumerable<Domain.User_Grant_AlertRights>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }


        public Response<bool> UpdateSetup(List<Domain.User_Grant_AlertRights> SectionAdd)
        {
            var Details = new List<Repository.User_Grant_AlertRights>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd)
                {

                    Details.Add(new Repository.User_Grant_AlertRights
                    {
                        AlertID = details.AlertID,
                        EmployeeID = details.EmployeeID,
                        Mail = details.Mail,
                        SMS = details.SMS,
                        Popup = details.Popup,
                       
                    });
                }
            }


            var result = strobj.UpdateSetup(Details);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");


        }

     

    }
}
