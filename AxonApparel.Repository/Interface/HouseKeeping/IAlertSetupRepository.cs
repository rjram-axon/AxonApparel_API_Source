using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IAlertSetupRepository
    {
        IEnumerable<Domain.AlertType> GetMainList(string Alerttype, int Alertid);
        IEnumerable<Domain.AlertType> GetDDlList(string Alerttype);

        IEnumerable<Domain.User_Grant_AlertRights> GetAlertEditbyid(int Alertid);
        IEnumerable<Domain.User_Grant_AlertRights> GetAlertDetails(string Alertname, string Category, string Orderno);

        bool UpdateSetup(List<Repository.User_Grant_AlertRights> ScetionUpd);
      
    }
}
