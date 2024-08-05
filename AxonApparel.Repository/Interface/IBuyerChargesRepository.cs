using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IBuyerChargesRepository
    {
        bool AddData(BuyerCharges objAd, List<BuyerCharges> objCDet,string Mode);
        IQueryable<Domain.BuyerCharges> LoadMaingrid();
        IList<Domain.BuyerCharges> GetbyId(int BuyerId);
        bool UpdData(BuyerCharges objAd, List<BuyerCharges> objCDet, string Mode);
        bool DelData(BuyerCharges objAd, List<BuyerCharges> objCDet, string Mode);
       
        BuyerCharges ListMainGrid(int buyid);
    }
}
