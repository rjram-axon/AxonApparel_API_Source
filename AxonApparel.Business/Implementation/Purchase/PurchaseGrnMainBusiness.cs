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
   public class PurchaseGrnMainBusiness:IPurchaseGrnMainBusiness
    {
       IPurchaseGrnMainRepository PMRep = new PurchaseGrnMainRepository();

        public Response<IQueryable<PurchaseGrnMas>> GetDataOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataOrderRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> GetPurchaseOrderId(int GrnId)
        {
            try
            {
                var purid = PMRep.GetPurid(GrnId);

                return new Response<int>(purid, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseGrnMas>> GetDataGrnMainDetails(string OrderNo, string RefNo, string Dc_no, int? supplierid, int? companyid, int? PurOrdId, int? Grn_MasId, string pur_type, string Pur_ItemType, string FromDate, string ToDate,string PurIndType)
        {
            try
            {
                var PWO = PMRep.GetDataPurGrnMainRepDetails(OrderNo, RefNo, Dc_no, supplierid, companyid, PurOrdId, Grn_MasId, pur_type, Pur_ItemType, FromDate, ToDate,PurIndType);

                return new Response<IQueryable<PurchaseGrnMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PurchaseGrnMas>> LoadItemstockMovement(string GrnNo)
        {
            try
            {
                var ProductWO = PMRep.LoadItemstockMovement(GrnNo);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseGrnMas>> GetDataPoOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataPoOrderRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseGrnMas>> GetDataSuppOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataSuppOrderRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseGrnMas>> GetDataDcOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataDcOrderRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseGrnMas>> GetDataGrnOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataGrnOrderRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseGrnMas>> GetDataStockGrnDetails()
        {
            try
            {
                var ProductWO = PMRep.GetDataStkGrnOrderRepDetails();

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

        public Response<IQueryable<PurchaseGrnMas>> LoadMainOrderStkdet(int pid)
        {
            try
            {
                var ProductWO = PMRep.LoadMainOrderStkdet(pid);

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
