using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class StoresDeliReturnRepository : IStoresDeliReturnRepository
    {

        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<StoresDeliveryReturn> GetDataOrderRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, int? Issueid, string Unit_Supplier_self)
        {
            IQueryable<StoresDeliveryReturn> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliReturnAddOrderDropDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, Desunitid == null ? 0 : Desunitid, Issueid == null ? 0 : Issueid, OType, ItemType)
                                                      select new StoresDeliveryReturn
                                                {

                                                    OrdNo = (cd1.Order_No == null ? "" : cd1.Order_No),                                
                                                   
                                                    RefNo = (cd1.Ref_No == null ? "" : cd1.Ref_No),             
                                               
                                                    BMasId = (int)(cd1.Buy_Ord_MasId == null ? 0 : cd1.Buy_Ord_MasId), 


                                                }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDeliveryReturn> GetDataIssNoRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string Refno, string Unit_Supplier_self)
        {
            IQueryable<StoresDeliveryReturn> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliReturnIssNoDropAddDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, Desunitid == null ? 0 : Desunitid, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(Refno) ? "" : Refno, OType, ItemType)
                                                      select new StoresDeliveryReturn
                                                      {

                                                          Issueid = cd1.IssueId,
                                                          IssueNo = cd1.Issueno,

                                                      }).AsQueryable();
            return query;
        }


        public IList<StoresDeliveryReturn> GetDataAddRetRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string OrdNo, string Refno, string Unit_Supplier_self, int? Issueid)
        {


            var query = (from YD in entities.Proc_Apparel_GetStoresDeliReturnAddDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, Desunitid == null ? 0 : Desunitid, Issueid == null ? 0 : Issueid, OType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(Refno) ? "" : Refno, ItemType)
                         select new StoresDeliveryReturn
                         {
                             Unit_Supplier_self = YD.Unit,
                             IssueNo = YD.issueno,
                             ReturnDate = (DateTime)YD.issuedate,
                             Reference = YD.reference,
                             Issueid = YD.issueid,
                             QualityMade = "",

                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<StoresDeliveryReturn> GetDataRetRepDetails(int Id)
        {
            IQueryable<StoresDeliveryReturn> query = (from a in entities.Proc_Apparel_GetStoresDeliReturnEntryDetails(Id)

                                                      select new StoresDeliveryReturn
                                              {
                                                  Company = a.company,
                                                  Unit_Supplier_self = a.unit,
                                                  OType = a.job_mac_gen,
                                                  Issueid = (int)a.issueid,
                                                  IssueNo = a.issueno,
                                                  CompanyId = a.companyid,


                                              }).AsQueryable();

            return query;
        }


        public IList<StoresDeliveryReturnDet> GetDataRetRepItemDetails(int Issueid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetStoresDeliReturnEntryItemDetails(Issueid)
                         select new StoresDeliveryReturnDet
                         {
                             Itemid = (int)YD1.itemid,
                             Colorid = (int)YD1.colorid,
                             Sizeid = (int)YD1.sizeid,
                             Joborderno = YD1.orderno,
                             ReturnDetid = 0,
                             Returnid = 0,
                             IssQty = YD1.IssueQty,
                             BalQty = (decimal)YD1.Balance,
                             ReturnQty = 0,
                             AcceptedQty = 0,
                             Uom = YD1.Uom,
                             secqty = YD1.SecQty,
                             SUom = YD1.SecUom,
                             IssId = YD1.IssueId,
                             IssueStockID = YD1.IssueStockID,
                             Stockid = YD1.StockID,
                             ReIsDec = YD1.RetIsDec,
                             SecIsDec = YD1.SecIsDec,
                             Item = YD1.item,
                             Color = YD1.color,
                             Size = YD1.size,


                         }).AsQueryable();

            return query.ToList();
        }



        public bool AddDetData(Stores_Issue_ReturnMas objDelRetEntry, List<Stores_Issue_ReturnDet> objDelRetItem)
        {
            int RetDetId = 0;
            int RetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Stores_Issue_ReturnMas.Add(objDelRetEntry);
                    entities.SaveChanges();
                    RetId = objDelRetEntry.ReturnId;
                    foreach (var Im in objDelRetItem)
                    {

                        Im.Returnid = RetId;
                        entities.Stores_Issue_ReturnDet.Add(Im);
                        entities.SaveChanges();
                        RetDetId = Im.ReturnDetid;

                        //if (Im.AcceptedQty > 0 || Im.ReturnQty > 0)
                        //{
                        //    //Update the Stock 
                        //    var Pg1 = entities.Proc_Apparel_ProStRtn_TransAdd(Im.Returnid);
                        //    entities.SaveChanges();

                        //}


                    }
                    var Pg1 = entities.Proc_Apparel_ProStRtn_TransAdd(RetId);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public IQueryable<StoresDeliveryReturn> GetDataMainOrderRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string Reference)
        {
            IQueryable<StoresDeliveryReturn> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliReturnMainDropOrdRefNoDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, ReturnId == null ? 0 : ReturnId, Desunitid == null ? 0 : Desunitid, OType, ItemType, string.IsNullOrEmpty(Reference) ? "" : Reference)
                                                      select new StoresDeliveryReturn
                                                {

                                                    OrdNo = (cd1.order_no == null ? "" : cd1.order_no),                                                    
                                                    RefNo = (cd1.ref_no == null ? "" : cd1.ref_no),                                                 
                                                    BMasId = (int)(cd1.BMasId == null ? 0 : cd1.BMasId),


                                                }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDeliveryReturn> GetDataMainRefRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo)
        {




            IQueryable<StoresDeliveryReturn> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliReturnMainDropReferDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, ReturnId == null ? 0 : ReturnId, Desunitid == null ? 0 : Desunitid, OType, ItemType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo)
                                                      select new StoresDeliveryReturn
                                                      {
                                                          Reference = cd1.Reference,
                                                          ReturnId = 0,

                                                      }).AsQueryable();
            return query;
        }

        public IQueryable<StoresDeliveryReturn> GetDataMainRetRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string Reference, string OrdNo, string RefNo)
        {
            IQueryable<StoresDeliveryReturn> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliReturnMainDropRetNoDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, string.IsNullOrEmpty(Reference) ? "" : Reference, Desunitid == null ? 0 : Desunitid, OType, ItemType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo)
                                                      select new StoresDeliveryReturn
                                                      {

                                                          ReturnNo = cd1.Returnno,
                                                          ReturnId = (int)cd1.ReturnId,


                                                      }).AsQueryable();
            return query;
        }

        public IQueryable<StoresDeliveryReturn> GetDataMainUnSuppRepDetails(string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference)
        {
            IQueryable<StoresDeliveryReturn> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliReturnMainDropUnitSuppDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, ReturnId == null ? 0 : ReturnId, OType, ItemType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Reference) ? "" : Reference)
                                                      select new StoresDeliveryReturn
                                                      {

                                                          Unit_Supplier_self = cd1.desunit,
                                                          Desunitid = (int)cd1.DesUnitId,


                                                      }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDeliveryReturn> GetDataDeliRetMainRepDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference)
        {
            IQueryable<StoresDeliveryReturn> query = (from cd4 in entities.Proc_Apparel_GetStoresDeliReturnMainDetails(CompanyId == null ? 0 : CompanyId, Unit_Supplier_self, ReturnId == null ? 0 : ReturnId, Desunitid == null ? 0 : Desunitid, OType, ItemType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Reference) ? "" : Reference)
                                                      select new StoresDeliveryReturn
                                               {

                                                   Unit_Supplier_self = cd4.Unit,
                                                   ReturnNo = cd4.ReturnNo,
                                                   ReturnId = cd4.ReturnId,
                                                   Reference = cd4.Reference,
                                                   ReturnDate = (DateTime)cd4.ReturnDate,
                                                   IssueNo = cd4.IssueNo,
                                                   CompanyId=cd4.CompanyId,
                                                   Company=cd4.Company,
                                                   Desunit=cd4.desunit,
                                                   Desunitid=(int)cd4.DesUnitId,
                                                   OrdNo=cd4.order_no,
                                                   RefNo=cd4.ref_no

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDeliveryReturn> GetDataRepEditDeliRetDetails(int Id)
        {
            IQueryable<StoresDeliveryReturn> query = (from a in entities.Proc_Apparel_GetStoresDeliReturnEditDetails(Id)
                                                      select new StoresDeliveryReturn
                                                {
                                                    CompanyId = a.companyid,
                                                    Company = a.Company,
                                                    Issueid = (int)a.issueid,
                                                    IssueNo = a.issueno,
                                                    ReturnDate = (DateTime)a.ReturnDate,
                                                    ReturnNo = a.returnno,
                                                    ReturnId = a.returnid,
                                                    Unit_Supplier_self = a.unit_supplier_self,
                                                    Desunit = (a.desunit == null ? "" : a.desunit),
                                                    Desunitid = (int)(a.DesUnitId == 0 ? null : a.DesUnitId),
                                                    Remarks = a.Remarks,
                                                    UnSupId = (int)(a.UnitSpId == null ? 0 : a.UnitSpId),
                                                    UnSup = (a.Unit == null ? "" : a.Unit),
                                                    OType = a.Job_Mac_Gen,



                                                }).AsQueryable();

            return query;
        }


        public IList<StoresDeliveryReturnDet> GetDataRetRepEditItemDetails(string ReturnNo, int Issueid, string OType)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetStoresDeliReturnEntryEditItemDetails(ReturnNo, Issueid, OType)
                         select new StoresDeliveryReturnDet
                         {
                             Itemid = (int)YD1.ItemId,
                             Colorid = (int)YD1.ColorId,
                             Sizeid = (int)YD1.SizeId,
                             Joborderno = YD1.OrderNo,
                             ReturnDetid = (int)YD1.ReturnDetid,
                             Returnid = (int)YD1.Returnid,
                             IssQty = YD1.IssueQty,
                             BalQty = (decimal)YD1.Balance + (decimal)YD1.ReturnQty,
                             ReturnQty = (decimal)YD1.ReturnQty,
                             AcceptedQty = (decimal)YD1.AcceptedQty,
                             Uom = YD1.Uom,
                             secqty = YD1.SecQty,
                             SUom = YD1.SecUom,
                             IssId = YD1.IssueId,
                             IssueStockID = YD1.IssueStockID,
                             Stockid = YD1.StockId,
                             ReIsDec = YD1.RetIsDec,
                             SecIsDec = YD1.SecIsDec,
                             Item = YD1.Item,
                             Color = YD1.Color,
                             Size = YD1.Size,


                         }).AsQueryable();

            return query.ToList();
        }




        public bool UpdateDetData(Stores_Issue_ReturnMas objEDelREntry, List<Stores_Issue_ReturnDet> objEDelRDet, int RetId, string ReturnNo)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Stores_Issue_ReturnMas.Where(c => c.ReturnId == objEDelREntry.ReturnId).FirstOrDefault();
                    if (App != null)
                    {

                        App.ReturnNo = objEDelREntry.ReturnNo;
                        App.ReturnDate = objEDelREntry.ReturnDate;
                        App.Desunitid = objEDelREntry.Desunitid;
                        App.Unit_Supplier_self = objEDelREntry.Unit_Supplier_self;
                    }
                    entities.SaveChanges();

                    foreach (var Im in objEDelRDet)
                    {

                        if (Im.AcceptedQty > 0 || Im.ReturnQty > 0)
                        {
                  
                            var Pg3 = entities.Proc_Apparel_GetStoresDeliDeleteItemOut(ReturnNo);
                            entities.SaveChanges();

                            ////Update the itemStockout 
                            //var Pg5 = entities.Proc_Apparel_ProStRtn_TransDelete(RetId);
                            //entities.SaveChanges();

                        }
                        
                    }

                    var Pg5 = entities.Proc_Apparel_ProStRtn_TransDelete(RetId);
                    entities.SaveChanges();


                    var Pg2 = entities.Proc_Apparel_GetStoresDeliDeleteDet(RetId);
                    entities.SaveChanges();


                    foreach (var Im in objEDelRDet)
                    {                        
                        Im.Returnid = RetId;
                        entities.Stores_Issue_ReturnDet.Add(Im);
                        entities.SaveChanges();                      
                    }

                    //Update the Stock 
                    var Pg1 = entities.Proc_Apparel_ProStRtn_TransAdd(RetId);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool DeleteDetData(List<Stores_Issue_ReturnDet> objEDelRDet, string ReturnNo, int RetId)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    foreach (var Im in objEDelRDet)
                    {


                        if (Im.AcceptedQty > 0 || Im.ReturnQty > 0)
                        {

                            //Update the itemStockout 
                            var Pg3 = entities.Proc_Apparel_GetStoresDeliDeleteItemOut(ReturnNo);
                            entities.SaveChanges();                        
                        }

                        
                    }

                    var Pg5 = entities.Proc_Apparel_ProStRtn_TransDelete(RetId);
                    entities.SaveChanges();

                    var Pg8 = entities.Proc_Apparel_GetStoresDeliDeleteRet(RetId);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
