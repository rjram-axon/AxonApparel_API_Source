using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IProcessSeqSetBusiness
    {
        Response<bool> CreateProcessSeqSetUpEntry(int[] sbTwo);
    }
}
