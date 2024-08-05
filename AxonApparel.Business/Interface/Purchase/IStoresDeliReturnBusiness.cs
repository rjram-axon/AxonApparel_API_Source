using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IStoresDeliReturnBusiness
    {
       Response<IQueryable<StoresDeliveryReturn>> GetDataOrderDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, int? Issueid, string Unit_Supplier_self);
       Response<IQueryable<StoresDeliveryReturn>> GetDataIssDetails(int? Desunitid, string OType, string ItemType, int? CompanyId,string OrdNo,string RefNo, string Unit_Supplier_self);
       Response<IList<StoresDeliveryReturn>> ListAddDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string RefNo, string Unit_Supplier_self, int? Issueid);
       Response<IQueryable<StoresDeliveryReturn>> GetDataRetEntryDetails(int Id);
       Response<IList<StoresDeliveryReturnDet>> GetStoresDeliRetEntryDetails(int Issueid);
       Response<bool> CreateDelRetEntry(StoresDeliveryReturn POREntry);
       Response<IQueryable<StoresDeliveryReturn>> GetDataMainOrderDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string Reference);
       Response<IQueryable<StoresDeliveryReturn>> GetDataMainRefDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo,string RefNo);
       Response<IQueryable<StoresDeliveryReturn>> GetDataMainRetDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string Reference, string OrdNo, string RefNo);
       Response<IQueryable<StoresDeliveryReturn>> GetDataMainUnSuppDetails(string OType, string ItemType, int? CompanyId, string Unit_Supplier_self,int? ReturnId, string OrdNo, string RefNo,string Reference);
       Response<IQueryable<StoresDeliveryReturn>> GetDataDeliRetMainDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference);
       Response<IQueryable<StoresDeliveryReturn>> GetDeliRetEditDetails(int Id);
       Response<IList<StoresDeliveryReturnDet>> GetStoresDeliRetEntryItemEdit(string ReturnNo, int Issueid, string OType);
       Response<bool> UpdateDelRetEntry(StoresDeliveryReturn POREntry);
       Response<bool> DeleteDelRetEntry(StoresDeliveryReturn DelDEntry);
    }
}
