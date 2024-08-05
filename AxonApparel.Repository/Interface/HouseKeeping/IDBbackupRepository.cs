using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IDBbackupRepository
    {
        bool UpdateShrinkDetData();
        bool UpdateBackUpDetData();
        string UpdateBackUpDetDataLogin();
    }
}
