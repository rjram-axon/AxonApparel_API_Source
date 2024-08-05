using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IGarmentUomBusiness
    {
        Response<IEnumerable<Garment_Uom>> GetGarmentUom();
        Response<IEnumerable<Garment_Uom>> GetBaseUom();

        Response<Garment_Uom> GetGarmentUomId(int GarmentUomId);

        Response<int> CreateGarmentUom(Garment_Uom GarmentUomAdd);

        Response<bool> UpdateGarmentUom(Garment_Uom GarmentUomUpd);

        Response<bool> DeleteGarmentUom(int GarmentUomId);
        Response<IList<Garment_Uom>> GetGuomCheckItemDetails(int GUomId);
    }
}
