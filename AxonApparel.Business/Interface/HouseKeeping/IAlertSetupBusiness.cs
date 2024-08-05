using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IAlertSetupBusiness
    {
        Response<IEnumerable<AlertType>> GetMainList(string Alerttype,int Alertid);
        Response<IEnumerable<AlertType>> GetDDlList(string Alerttype);

        Response<IEnumerable<User_Grant_AlertRights>> GetAlertEditbyid(int Alertid);
        Response<IEnumerable<User_Grant_AlertRights>> GetAlertDetails(string Alertname, string Category, string Orderno);
     
        Response<bool> UpdateSetup(List<User_Grant_AlertRights> ScetionUpd);
      
    }
}
