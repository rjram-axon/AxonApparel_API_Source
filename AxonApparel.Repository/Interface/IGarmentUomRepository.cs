using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IGarmentUomRepository:IBaseRepository<Garment_Uom>
    {
        IEnumerable<Garment_Uom> GetDataListBase();
        IEnumerable<Garment_Uom> GetDataListAll();
        IList<Domain.Garment_Uom> GetRepGuomCheckItemDetails(int Guomid);


    }
}
