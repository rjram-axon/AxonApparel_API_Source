using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IStoreSetupRepository
    {
        IEnumerable<EmpStoreSetup> GetMainList(int Employeeid, int Storeid);
        IEnumerable<EmpStoreSetup> GetEmployeeDDl();
        IEnumerable<EmpStoreSetup> GetStoreDDL();
        IEnumerable<EmpStoreSetup> GetAddSetup();
        IEnumerable<EmpStoreSetup> GetEditSetup(int id);
        IEnumerable<EmpStoreSetup> GetStoreRights(int Userid, string Storetype, int Companyid);

        bool CreateSetup(IList<Emp_Store_Setup> SectionAdd);
        bool UpdateSetup(IList<Emp_Store_Setup> ScetionUpd);
        bool DeleteSetup(IList<Emp_Store_Setup> ScetionUpd);

    }
}
