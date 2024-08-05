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
    public class StoresDeliReturnBusiness : IStoresDeliReturnBusiness
    {
        IStoresDeliReturnRepository DLRep = new StoresDeliReturnRepository();

        public Response<IQueryable<StoresDeliveryReturn>> GetDataOrderDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, int? Issueid, string Unit_Supplier_self)
        {
            try
            {
                var PWO = DLRep.GetDataOrderRepDetails(Desunitid, OType, ItemType, CompanyId, Issueid, Unit_Supplier_self);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDeliveryReturn>> GetDataIssDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string RefNo, string Unit_Supplier_self)
        {
            try
            {
                var PWO = DLRep.GetDataIssNoRepDetails(Desunitid, OType, ItemType, CompanyId, OrdNo, RefNo, Unit_Supplier_self);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryReturn>> ListAddDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string RefNo, string Unit_Supplier_self, int? Issueid)
        {
            try
            {
                var ProductWO = DLRep.GetDataAddRetRepDetails(Desunitid, OType, ItemType, CompanyId, OrdNo, RefNo, Unit_Supplier_self, Issueid);

                return new Response<IList<StoresDeliveryReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDeliveryReturn>> GetDataRetEntryDetails(int Id)
        {
            try
            {
                var ProductWO = DLRep.GetDataRetRepDetails(Id);

                return new Response<IQueryable<StoresDeliveryReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryReturnDet>> GetStoresDeliRetEntryDetails(int Issueid)
        {
            try
            {
                var ProductWO = DLRep.GetDataRetRepItemDetails(Issueid);

                return new Response<IList<StoresDeliveryReturnDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<StoresDeliveryReturnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateDelRetEntry(StoresDeliveryReturn POREntry)
        {
            int? desunitid = 0;
            int? IssId = 0; 
            int? CreatedBy = 0;
            string Remark = "";
            string JobNo = "";
            string IRemark = "";
            int? stkId = 0;

            if (POREntry.Desunitid == 0)
            {
                desunitid = null;
            }
            else
            {
                desunitid = POREntry.Desunitid;
            }

            if (POREntry.Issueid == 0)
            {
                IssId = null;
            }
            else
            {
                IssId = POREntry.Issueid;
            }
            if (POREntry.CreatedBy == 0)
            {
                CreatedBy = null;
            }
            else
            {
                CreatedBy = POREntry.CreatedBy;
            }
            if (POREntry.Remarks == null)
            {
                Remark = "";
            }
            else
            {
                Remark = POREntry.Remarks;
            }


            try
            {
                     


                AxonApparel.Repository.Stores_Issue_ReturnMas StoresDelRetInsert = new AxonApparel.Repository.Stores_Issue_ReturnMas
                {
                    ReturnNo = POREntry.ReturnNo,
                    ReturnDate = POREntry.ReturnDate,
                    Issueid = POREntry.Issueid,
                    Remarks = Remark,
                    Unit_Supplier_self = POREntry.Unit_Supplier_self,
                    Desunitid = desunitid,
                    CreatedBy = POREntry.CreatedBy,
                    QualityMade = POREntry.QualityMade,

                };

                var ItmList = new List<Stores_Issue_ReturnDet>();

                foreach (var PItem in POREntry.StoresDeliRDet)
                {
                    if (PItem.Itemremarks == null)
                    {
                        IRemark = "";
                    }
                    else
                    {
                        IRemark = PItem.Itemremarks;
                    }

                    if (PItem.Joborderno == null)
                    {
                        JobNo = "";
                    }
                    else
                    {
                        JobNo = PItem.Joborderno;
                    }

                    if (PItem.Stockid == 0)
                    {
                        stkId = null;
                    }
                    else
                    {
                        stkId = PItem.Stockid;
                    }

                    if (PItem.IssQty > 0)
                    {
                        ItmList.Add(new Stores_Issue_ReturnDet
                        {
                            ReturnDetid = PItem.ReturnDetid,
                            Returnid = PItem.Returnid,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            ReturnQty = PItem.ReturnQty,
                            Joborderno = JobNo,//PItem.Joborderno,
                            secqty = PItem.secqty,
                            Stockid = stkId,
                            Itemremarks = IRemark,
                            IssueStockID = PItem.IssueStockID,                        
                            AcceptedQty=PItem.AcceptedQty,
                            

                        });
                    }
                }


                var result = DLRep.AddDetData(StoresDelRetInsert,ItmList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDeliveryReturn>> GetDataMainOrderDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string Reference)
        {
            try
            {
                var PWO = DLRep.GetDataMainOrderRepDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, Reference);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDeliveryReturn>> GetDataMainRefDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo)
        {
            try
            {
                var PWO = DLRep.GetDataMainRefRepDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, OrdNo, RefNo);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<StoresDeliveryReturn>> GetDataMainRetDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string Reference, string OrdNo, string RefNo)
        {
            try
            {
                var PWO = DLRep.GetDataMainRetRepDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, OrdNo, RefNo, Reference);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<StoresDeliveryReturn>> GetDataMainUnSuppDetails(string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference)
        {
            try
            {
                var PWO = DLRep.GetDataMainUnSuppRepDetails(OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, OrdNo, RefNo, Reference);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDeliveryReturn>> GetDataDeliRetMainDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference)
        {
            try
            {
                var PWO = DLRep.GetDataDeliRetMainRepDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, OrdNo, RefNo, Reference);

                return new Response<IQueryable<StoresDeliveryReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StoresDeliveryReturn>> GetDeliRetEditDetails(int Id)
        {
            try
            {
                var ProdutWO = DLRep.GetDataRepEditDeliRetDetails(Id);

                return new Response<IQueryable<StoresDeliveryReturn>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StoresDeliveryReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<StoresDeliveryReturnDet>> GetStoresDeliRetEntryItemEdit(string ReturnNo, int Issueid, string OType)
        {
            try
            {
                var ProductWO = DLRep.GetDataRetRepEditItemDetails(ReturnNo, Issueid, OType);

                return new Response<IList<StoresDeliveryReturnDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<StoresDeliveryReturnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateDelRetEntry(StoresDeliveryReturn POREntry)
        {
            int? desunitid = 0;
            int? IssId = 0;
            int? CreatedBy = 0;
            string Remark = "";
            string IRemark = "";
            int? stkId = 0;
            string JobNo = "";

            if (POREntry.Desunitid == 0)
            {
                desunitid = null;
            }
            else
            {
                desunitid = POREntry.Desunitid;
            }

            if (POREntry.Issueid == 0)
            {
                IssId = null;
            }
            else
            {
                IssId = POREntry.Issueid;
            }
            if (POREntry.CreatedBy == 0)
            {
                CreatedBy = null;
            }
            else
            {
                CreatedBy = POREntry.CreatedBy;
            }
            if (POREntry.Remarks == null)
            {
                Remark = "";
            }
            else
            {
                Remark = POREntry.Remarks;
            }

            try
            {

           
                AxonApparel.Repository.Stores_Issue_ReturnMas StoresDelRetEdit = new AxonApparel.Repository.Stores_Issue_ReturnMas
                {
                    ReturnId = POREntry.ReturnId,
                    ReturnNo = POREntry.ReturnNo,
                    ReturnDate = POREntry.ReturnDate,
                    Issueid = POREntry.Issueid,
                    Remarks = Remark,
                    Unit_Supplier_self = POREntry.Unit_Supplier_self,
                    Desunitid = desunitid,
                    CreatedBy = POREntry.CreatedBy,
                    QualityMade = POREntry.QualityMade,

                };


                var ItmList = new List<Stores_Issue_ReturnDet>();

                foreach (var PItem in POREntry.StoresDeliRDet)
                {
                    if (PItem.Itemremarks == null)
                    {
                        IRemark = "";
                    }
                    else
                    {
                        IRemark = PItem.Itemremarks;
                    }

                    if (PItem.Stockid == 0)
                    {
                        stkId = null;
                    }
                    else
                    {
                        stkId = PItem.Stockid;
                    }

                    if (PItem.Joborderno == null)
                    {
                        JobNo = "";
                    }
                    else
                    {
                        JobNo = PItem.Joborderno;
                    }

                    if (PItem.IssQty > 0)
                    {
                        ItmList.Add(new Stores_Issue_ReturnDet
                        {
                            ReturnDetid = PItem.ReturnDetid,
                            Returnid = POREntry.ReturnId,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            ReturnQty = PItem.ReturnQty,
                            Joborderno = JobNo,//PItem.Joborderno,
                            secqty = PItem.secqty,
                            Stockid = stkId,
                            Itemremarks = IRemark,
                            IssueStockID = PItem.IssueStockID,
                            AcceptedQty = PItem.AcceptedQty,

                        });
                    }
                }


                var result = DLRep.UpdateDetData(StoresDelRetEdit,ItmList, POREntry.ReturnId, POREntry.ReturnNo);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteDelRetEntry(StoresDeliveryReturn DelDEntry)
        {
            try
            {

                var OrderList = new List<Stores_Issue_ReturnDet>();

                foreach (var OItem in DelDEntry.StoresDeliRDet)
                {


                    if (OItem.ReturnQty > 0)
                    {
                        OrderList.Add(new Stores_Issue_ReturnDet
                        {

                            ReturnDetid = OItem.ReturnDetid,
                            Returnid = DelDEntry.ReturnId,
                            Itemid = OItem.Itemid,
                            Colorid = OItem.Colorid,
                            Sizeid = OItem.Sizeid,
                            ReturnQty = OItem.ReturnQty,
                            Joborderno = OItem.Joborderno,
                            secqty = OItem.secqty,
                            Stockid = OItem.Stockid,
                            Itemremarks = OItem.Itemremarks,
                            IssueStockID = OItem.IssueStockID,
                            AcceptedQty = OItem.AcceptedQty,


                        });
                    }
                }
                  

                var result = DLRep.DeleteDetData(OrderList,DelDEntry.ReturnNo,DelDEntry.ReturnId );

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
