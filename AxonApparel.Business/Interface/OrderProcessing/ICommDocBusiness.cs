using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface ICommDocBusiness
    {
        Response<int> AddImg(CommDoc CommdocAdd);
       Response<bool> UpdateImg(CommDoc CommdocUpd);
        Response<CommDoc> GetCommId(int commDocId);
    }
}
