using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace AxonApparel.Business
{
    public interface IStoreDeliveryBusiness
    {
        Response<IList<StoresDelivery>> ListAddDetails(int? Companyid, int? Buyerid, string OrderNo, string RefNo, int? FromStoreUnitID, int? Companyunitid, string Job_Mac_Gen, string ItemType, string unit_or_other, string IgroupId);
        Response<IList<StoresDeliveryDet>> ListDelyItemDetails(string JMasId, string Job_Mac_Gen, string ItemType, string ItemGroup, int Storeid,int Processid);
        Response<IList<StoresDeliveryOrder>> ListDelyOrderDetails(string JMasId, string Job_Mac_Gen, string ItemType, int OItemid, int OColorid, int OSizeid, int OUomid, int ESNo, int Processid);
        Response<IList<StoresDeliveryStock>> ListDelyStockDetails(string JMasId, string Job_Mac_Gen, string ItemType, int Companyid, int FromStoreUnitID, string Joborderno, int OItemid, int OColorid, int OSizeid, int OUomid, int ONo, int Processid);
        Response<bool> CreateDelEntry(StoresDelivery PODEntry);
        Response<IQueryable<StoresDelivery>> GetDataUnitDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate,int? Companyid);
        Response<IQueryable<StoresDelivery>> GetDataOrderDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);
        Response<IQueryable<StoresDelivery>> GetDataIssueDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);

        Response<IQueryable<StoresDelivery>> GetDataDisDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);
        Response<IQueryable<StoresDelivery>> GetDataDelyMainDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId);

        Response<IQueryable<StoresDelivery>> GetDeliEditDetails(int Id);

        Response<IList<StoresDeliveryDet>> GetEditDetDetails(int Id, string Job_Mac_Gen);
        Response<IList<StoresDeliveryOrder>> GetEditOrdDetails(int IssueId, int OItemid, int OColorid, int OSizeid, int OUomid, string Job_Mac_Gen);
        Response<IList<StoresDeliveryStock>> GetEditStkDetails(int? IssueId, int? OItemid, int? OColorid, int? OSizeid, int? OUomid, string Job_Mac_Gen, int? Companyid, int? FromStoreUnitID);
        Response<bool> UpdateDelEntry(StoresDelivery DelEEntry);
        Response<bool> DeleteDelEntry(StoresDelivery DelDEntry);
        Response<IQueryable<StoresDelivery>> LoadMainOrderdet(int IssId);
    }
}
