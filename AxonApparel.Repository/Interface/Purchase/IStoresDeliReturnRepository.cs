using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IStoresDeliReturnRepository
    {
        IQueryable<StoresDeliveryReturn> GetDataOrderRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, int? Issueid, string Unit_Supplier_self);
        IQueryable<StoresDeliveryReturn> GetDataIssNoRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string Refno, string Unit_Supplier_self);
        IList<StoresDeliveryReturn> GetDataAddRetRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string Refno, string Unit_Supplier_self, int? Issueid);
        IQueryable<StoresDeliveryReturn> GetDataRetRepDetails(int Id);
        IList<StoresDeliveryReturnDet> GetDataRetRepItemDetails(int Issueid);      
        bool AddDetData(Stores_Issue_ReturnMas objDelRetEntry,List<Stores_Issue_ReturnDet> objDelRetItem);
        IQueryable<StoresDeliveryReturn> GetDataMainOrderRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string Reference);
        IQueryable<StoresDeliveryReturn> GetDataMainRefRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo);
        IQueryable<StoresDeliveryReturn> GetDataMainRetRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string Reference, string OrdNo, string RefNo);
        IQueryable<StoresDeliveryReturn> GetDataMainUnSuppRepDetails(string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference);
        IQueryable<StoresDeliveryReturn> GetDataDeliRetMainRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference);
        IQueryable<StoresDeliveryReturn> GetDataRepEditDeliRetDetails(int Id);
        IList<StoresDeliveryReturnDet> GetDataRetRepEditItemDetails(string ReturnNo, int Issueid, string OType);
       
        bool UpdateDetData(Stores_Issue_ReturnMas objEDelREntry,List<Stores_Issue_ReturnDet> objEDelRDet, int RetId, string ReturnNo);
        bool DeleteDetData(List<Stores_Issue_ReturnDet> objEDelRDet, string ReturnNo,int RetId);

    }
}
