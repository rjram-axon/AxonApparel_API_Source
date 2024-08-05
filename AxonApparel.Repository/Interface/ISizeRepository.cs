using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface ISizeRepository:IBaseRepository<Size>
    {
        IEnumerable<Domain.Size> GetYDataList();
        IEnumerable<Domain.Size> GetFDataList();
        IEnumerable<Domain.Size> GetGDataList();
        IEnumerable<Domain.Size> GetDataListAll();
        IList<Domain.Size> GetRepSizeCheckItemDetails(int SizeId);
        bool UpdateSizSeqDetData(List<Size> objAdDet);
        IList<Domain.Size> GetSizeRepSeqDetList();
    }
}
