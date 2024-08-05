using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IGenerateRightsBusiness
    {
        string GenerateRights(int RoleId, int Mnuname, string noofColumns,string suser);
    }
}
