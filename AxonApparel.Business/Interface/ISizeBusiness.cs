using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ISizeBusiness
    {
        Response<IEnumerable<Size>> GetSize();
        Response<IEnumerable<Size>> GetFSize();
        Response<IEnumerable<Size>> GetGSize();
        Response<IEnumerable<Size>> GetYSize();
        Response<Size> GetSizeId(int SizeId);
        Response<int> CreateSize(Size SizeAdd);
        Response<bool> UpdateSize(Size SizeUpd);
        Response<bool> DeleteSize(int SizeId);
        Response<IList<Size>> GetSizeCheckItemDetails(int SizeId);
        Response<bool> CreateSeqEntry(int[] sbTwo);
        Response<IList<Size>> GetSizeSeqList();
    }
}
