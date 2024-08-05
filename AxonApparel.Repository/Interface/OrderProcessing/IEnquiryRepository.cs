using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
   public interface IEnquiryRepository
    {
        //Buy_Ord_Mas1 AddBuyerOrderDetails(MarkEnqMas objAd);
        int AddData(MarkEnqMas enq);     
        bool DeleteData(int Id);
        bool UpdateData(MarkEnqMas objAd);
        bool UpdateItemData(List<MarkEnqItemDet> objAdItemDet);
        bool UpdateFabricData(List<MarkEnqFabric> objAdFabricDet);
        bool UpdateStyleData(MarkEnqStyle objAdStyleDet);
        bool UpdateEmbData(List<MarkEnqEmbPrint> objAdEmbDet);
        bool UpdatePrintData(List<MarkEnqEmbPrint> objAdPrintDet);
        MarkEnqMas GetDataById(int EnquiryId);
       // IQueryable<MarkEnqMas> GetDataList();
        IQueryable<Enquiry> GetDataList(int? companyId, string EntryNo,int? BuyerID,int? StyleId, string fromDate, string toDate);
       //Style 
        int AddStyleData(MarkEnqStyle enqStyle);
       //Item
        bool AddItemData(List<MarkEnqItemDet> objCDet);
       //Fabric 
        bool AddFabricData(List<MarkEnqFabric> objFDet);
       //emb
        bool AddEmbData(List<MarkEnqEmbPrint> objEDet);
        IQueryable<MarkEnqMas> GetEntryNoDataList();
        IQueryable<MarkEnqMas> GetBuyRefNoDataList();
        bool DeleteItem(List<int> Id);
        bool DeleteFabric(List<int> Id);
        bool DeleteEmp(List<int> Id);
        bool DeletePrinting(List<int> Id);
    }
}
