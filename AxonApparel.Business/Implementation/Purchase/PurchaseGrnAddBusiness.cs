using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class PurchaseGrnAddBusiness : IPurchaseGrnAddBusiness
    {

        IPurchaseGrnAddRepository PMRep = new PurchaseGrnAddRepository();

        public Response<IList<PurchaseGrnMas>> GetDataOrderDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType)
        {
            try
            {
                var ProductWO = PMRep.GetDataGrnOrderRepDetails(LocalImport, Purchase_Type, Purchase_ItemType, OrderNo, RefNo, SupplierId, companyid, PurIndType);

                return new Response<IList<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.PurchaseGrnMas>> GetDataOrderDetails_Barcode(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType)
        {
            try
            {
                var couList = PMRep.GetDataGrnOrderRepDetails_Barcode(LocalImport, Purchase_Type, Purchase_ItemType, OrderNo, RefNo, SupplierId, companyid, PurIndType);
                return new Response<IEnumerable<Domain.PurchaseGrnMas>>(couList.Select(m => new Domain.PurchaseGrnMas
                {
                    PurOrdNo = (m.PurOrdNo == null ? "" : m.PurOrdNo),
                    pur_type = (m.pur_type == null ? "" : m.pur_type),
                    PurOrdId = (m.PurOrdId == null ? 0 : m.PurOrdId),
                    OrdDate = m.OrdDate,
                    Amount = (m.Amount == null ? 0 : m.Amount),
                    companyid = (m.companyid == null ? 0 : m.companyid),
                    supplierid = (m.supplierid == null ? 0 : m.supplierid),
                    Supplier = (m.Supplier == null ? "" : m.Supplier),
                    IsApproved = (m.IsApproved == null ? "" : m.IsApproved),

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<IQueryable<PurchaseGrnMas>> GetDataOrderDropDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType)
        {
            try
            {
                var ProductWO = PMRep.GetDataGrnOrderDropRepDetails(LocalImport, Purchase_Type, Purchase_ItemType);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PurchaseGrnMas>> GetDataRefDropDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType)
        {
            try
            {
                var ProductWO = PMRep.GetDataGrnRefDropRepDetails(LocalImport, Purchase_Type, Purchase_ItemType);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PurchaseGrnMas>> LoadMainOrderdet(int pid)
        {
            try
            {
                var ProductWO = PMRep.LoadMainOrderdet(pid);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
