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
    public class PurchaseOrderMainBusiness:IPurchaseOrderMainBusiness
    {

        IPurchaseOrderMainRepository PMRep = new PurchaseOrderMainRepository();


        public Response<IQueryable<PurchaseOrder>> GetDataPirMainDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string PurIndType,string IsApproved)
        {
            try
            {
                var PWO = PMRep.GetDataPurMainRepDetails(OrderNo, RefNo, SupplierId, companyid, pur_ord_id, StyleId, LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate, PurIndType, IsApproved);

                return new Response<IQueryable<PurchaseOrder>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataPOrderDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataPOrderRepDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetPoNoTrack()
        {
            try
            {
                var ProductWO = PMRep.GetPoNoTrack();

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseOrder>> GetRecNoTrack()
        {
            try
            {
                var ProductWO = PMRep.GetRecNoTrack();

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




        public Response<IList<PurchaseOrder>> GetDataOrderRefDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataOrdeRefRepDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IList<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataStyleDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataStyleRepDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataSupplierDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PMRep.GetDataSupplierRepDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetDataPurMainAppDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string Type, int ToApprove)
        {
            try
            {
                var PWO = PMRep.GetDataPurMainAppDetails(OrderNo, RefNo, SupplierId, companyid, pur_ord_id, StyleId, LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate, Type, ToApprove);
                return new Response<IQueryable<PurchaseOrder>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> LoadMainOrderdet(int pid)
        {
            try
            {
                var ProductWO = PMRep.LoadMainOrderdet(pid);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseOrder>> LoadPreOrderdet(int Itemid, int Sizeid, int Colorid)
        {
            try
            {
                var ProductWO = PMRep.LoadPreOrderdet(Itemid, Sizeid, Colorid);

                return new Response<IQueryable<PurchaseOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseOrder>> GetSuppdet( int masid )
        {
            try
            {
                var PWO = PMRep.GetSuppdet(masid);

                return new Response<IQueryable<PurchaseOrder>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




    }
}
