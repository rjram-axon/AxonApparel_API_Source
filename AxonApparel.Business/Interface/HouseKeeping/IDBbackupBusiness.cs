using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IDBbackupBusiness
    {
        Response<bool> UpdateShrink();
        Response<bool> UpdateBackUp();
        string UpdateBackUpLogin();
    }
}
