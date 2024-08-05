using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface IPurchaseQualityRepository
    {
       IQueryable<PurchaseGrnMas> GetDataQualityRepDetails(int Id);
       IList<PurQltyDet> GetDataQltyRepItemDetails(int Id);
       IList<PurQltyOrder> GetDataQltyRepOrderDetails(int GrnDetId);
       IList<PurQltyOrder> GetDataQltyRepOrderSaveDetails(int GrnId);
      // bool UpdateData(Pur_Grn_Mas objPQEntry);
       bool AddDetData(List<pur_grn_qlty_det> objQltODet, DateTime QltDate, Pur_Grn_Mas objPQEntry, List<Pur_Grn_Det> objQltPurGDet, string PurIndType);
      // bool AddDetData(List<pur_grn_qlty_det> objQltODet,DateTime QltDate);
       IQueryable<PurchaseGrnMas> GetDataQualityRepEditDetails(int Id);
       IList<PurQltyDet> GetDataQltyRepEditItemDetails(int Id);
       IList<PurQltyOrder> GetDataQltyRepOrderEditDetails(int GrnDetId);
       IList<PurQltyOrder> GetDataQltyRepEditOrderSaveDetails(int GrnId);
       IList<PurQltyDet> GetDataQltyRepEditCheckItemDetails(string TransNo);
       //bool UpdateEditPurGrnDetData(List<Pur_Grn_Det> objQltPurEGDet, DateTime QltDate, string TransNo);
       bool UpdateDetData(List<Pur_Grn_Det> objQltPurEGDet, List<pur_grn_qlty_det> objQltEODet, DateTime QltDate, string TransNo, string PurIndType);

       //bool DeleteEditPurGrnDetData(Pur_Grn_Mas objPQDEntry, List<Pur_Grn_Det> objQltPurEGDet, DateTime QltDate, string TransNo);
       bool DeleteDetData(Pur_Grn_Mas objPQDEntry, List<Pur_Grn_Det> objQltPurEGDet, List<pur_grn_qlty_det> objQltEODet, DateTime QltDate, string TransNo, string PurIndType);
    }
}
