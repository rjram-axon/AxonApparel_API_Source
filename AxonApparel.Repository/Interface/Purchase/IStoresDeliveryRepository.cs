using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;


namespace AxonApparel.Repository
{
    public interface IStoresDeliveryRepository
    {
        IList<StoresDelivery> GetDataAddDelRepDetails(int? Companyid, int? Buyerid, string OrderNo, string RefNo, int? FromStoreUnitID, int? Companyunitid, string Job_Mac_Gen, string ItemType, string unit_or_other, string IgroupId);
        IList<StoresDeliveryDet> GetRepDelyItemLoad(string JMasId, string Job_Mac_Gen, string ItemType, string ItemGroup, int Storeid,int Processid);
        IList<StoresDeliveryOrder> GetRepDelyOrderLoad(string JMasId, string Job_Mac_Gen, string ItemType, int OItemid, int OColorid, int OSizeid, int OUomid, int ESNo, int Processid);
        IList<StoresDeliveryStock> GetRepDelyStockLoad(string JMasId, string Job_Mac_Gen, string ItemType, int Companyid, int FromStoreUnitID, string Joborderno, int OItemid, int OColorid, int OSizeid, int OUomid, int ONo, int Processid);
    
        bool AddDetData(Stores_Issue_Mas objDelEntry,List<Stores_Issue_Det> objDelDet, List<Stores_Issue_Order> objDelOrd, List<Stores_Issue_Stock> objDelStock, string Issueno, DateTime Issuedate, string OType);
        IQueryable<StoresDelivery> GetDataUnitRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid);
        IQueryable<StoresDelivery> GetDataOrderRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);
        IQueryable<StoresDelivery> GetDataDisRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);

        IQueryable<StoresDelivery> GetDataIssueRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);

        IQueryable<StoresDelivery> GetDataMainRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);
        IQueryable<StoresDelivery> GetDataRepEditDeliDetails(int Id);
        IList<StoresDeliveryDet> GetRepEntryDelyEditItemLoad(int Id, string Job_Mac_Gen);
        IList<StoresDeliveryOrder> GetRepEntryDelyEditOrdLoad(int IssueId, int OItemid, int OColorid, int OSizeid, int OUomid, string Job_Mac_Gen);
        IList<StoresDeliveryStock> GetRepEntryDelyEditStkLoad(int? IssueId, int? OItemid, int? OColorid, int? OSizeid, int? OUomid, string Job_Mac_Gen, int? Companyid, int? FromStoreUnitID);
     
        bool UpdateDetData(Stores_Issue_Mas objEDelEntry,List<Stores_Issue_Det> objEDelDet, List<Stores_Issue_Order> objEDelOrd, List<Stores_Issue_Stock> objEDelStock, string Issueno, DateTime Issuedate, string OType);
        bool DeleteDetData( List<Stores_Issue_Order> objDDelOrd, List<Stores_Issue_Stock> objDDelStock, string Issueno, DateTime Issuedate, string OType);
        IQueryable<Domain.StoresDelivery> LoadMainOrderdet(int IssId);
    }
}
