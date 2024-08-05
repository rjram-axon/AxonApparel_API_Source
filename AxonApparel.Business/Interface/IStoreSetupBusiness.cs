using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IStoreSetupBusiness
    {
        Response<IEnumerable<EmpStoreSetup>> GetMainList(int Employeeid, int Storeid);
        Response<IEnumerable<EmpStoreSetup>> GetEmployeeDDl();
        Response<IEnumerable<EmpStoreSetup>> GetStoreDDL();
        Response<IEnumerable<EmpStoreSetup>> GetAddSetup();
        Response<IEnumerable<EmpStoreSetup>> GetEditSetup(int id);
        Response<IEnumerable<EmpStoreSetup>> GetStoreRights(int Userid, string Storetype, int Companyid);

        Response<bool> CreateSetup(EmpStoreSetup SectionAdd);
        Response<bool> UpdateSetup(EmpStoreSetup ScetionUpd);
        Response<bool> DeleteSetup(EmpStoreSetup ScetionUpd);


    }
}
