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
    public class PurchaseIndentApprovalRepository : IPurchaseIndentApprovalRepository
    {
        PurchaseEntities entities = new PurchaseEntities();


        public IQueryable<PurchaseIndentApprovalMas> GetDataIndMoRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentApprovalMas> query = (from cd in entities.Proc_Apparel_GetPurIndOrderLoadMainOrdRefDropDown(Companyid, Purchase_Type, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                           select new PurchaseIndentApprovalMas
                                               {
                                                   OrdNo = cd.OrdNo,
                                                   RefNo = cd.RefNo,
                                                   BMasId = cd.BMasId,

                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentApprovalMas> GetDataIndMIRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentApprovalMas> query = (from cd1 in entities.Proc_Apparel_GetPurIndOrderLoadMainIndentNoDropDown(Companyid, Purchase_Type, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                           select new PurchaseIndentApprovalMas
                                                       {
                                                           IndentMasid = cd1.IndMasId,
                                                           IndentNo = cd1.IndNo,
                                                           EmployeeId = cd1.EmpId,
                                                           Employee = cd1.Employee,

                                                       }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentApprovalMas> GetDataIndMSRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentApprovalMas> query = (from cd2 in entities.Proc_Apparel_GetPurIndMainStatusDropDown()
                                                           select new PurchaseIndentApprovalMas
                                                           {
                                                               Status = cd2.Status,
                                                               StatusId = cd2.statusID,

                                                           }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentApprovalMas> GetDataPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate, string AppType)
        {
            IQueryable<PurchaseIndentApprovalMas> query = (from a in entities.Proc_Apparel_GetPurchaseIndentAppOrderLoadMain(string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, Company_unitid == null ? 0 : Company_unitid, Companyid == null ? 0 : Companyid, SectionID == null ? 0 : SectionID, EmployeeId == null ? 0 : EmployeeId, IndentMasid == null ? 0 : IndentMasid, Purchase_Type, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString(), AppType)
                                                           select new PurchaseIndentApprovalMas
                                               {
                                                   Company = a.Company,
                                                   CompUnit = a.companyunit,
                                                   IndentNo = a.IndentNo,
                                                   IndentDate = (DateTime)a.Indentdate,
                                                   IndentMasid = a.IndentMasid,
                                                   Section = a.Section,
                                                   Employee = a.employee,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseIndentApprovalMas> GetDataRepEditIndDetails(int Id)
        {
            IQueryable<PurchaseIndentApprovalMas> query = (from a in entities.Proc_Apparel_GetPurIndEditDetails(Id)
                                                           select new PurchaseIndentApprovalMas
                                                   {
                                                       Companyid = a.CompanyId,
                                                       Company = a.Company,
                                                       CompUnit = a.CompanyUnit,
                                                       Company_unitid = a.Company_unitid,
                                                       IndentDate = (DateTime)a.IndentDate,
                                                       IndentNo = a.IndentNo,
                                                       IndentMasid = a.IndentMasid,
                                                       IndentType = a.IndentType,
                                                       Purchase_itemType = a.Purchase_itemType,
                                                       Purchase_Type = a.Purchase_Type,
                                                       Remarks = a.Remarks,
                                                       Section = a.SectionName,
                                                       SectionID = a.SectionID,
                                                       Departmentid = a.Departmentid,
                                                       Department = a.Department,
                                                       Employee = a.Employee,
                                                       EmployeeId = (int)a.EmployeeId,


                                                   }).AsQueryable();

            return query;
        }


        public IList<PurchaseIndentApprovalDet> GetRepEntryEditIndItemLoad(string IndentMasid, string Purchase_Type)
        {
            var query = (from ID in entities.Proc_Apparel_GetPurchaseIndEntryEditItemDetails(IndentMasid, Purchase_Type)
                         select new PurchaseIndentApprovalDet
                         {
                             Item = ID.item,
                             Itemid = (int)ID.itemid,
                             Color = ID.color,
                             Colorid = (int)ID.colorid,
                             Size = ID.size,
                             Sizeid = (int)ID.sizeid,
                             Unit = ID.Unit,
                             BalanceQty = (decimal)ID.Order_Qty,
                             BaseUnit = ID.BaseUnit,
                             BaseUomid = (int)ID.BaseUnitid,
                             PurUomid = (int)ID.Pur_UOMid,
                             AppRate = (decimal)ID.Apprate,
                             CGST = ID.CGST,
                             SGST = ID.SGST,
                             IGST = ID.IGST,
                             HSNCODE = ID.HsNCode,
                             Rate = (decimal)ID.Apprate,
                             ItemRemark = ID.itemremarks,
                             Amt = 0,
                             Quantity = ID.Qty,
                             Sec_Qty = 0,
                             SNo = (int)ID.SNo,
                             Indentdetid = (int)ID.Indentdetid,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PurchaseIndentApprovalOrder> GetRepEntryEditIndOrderLoad(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type)
        {
            var query = (from IDO in entities.Proc_Apparel_GetPurchaseIndEditOrderDetails(IndentMasid, OItemid, OColorid, OSizeid, OUomid, Purchase_Type)
                         select new PurchaseIndentApprovalOrder
                         {
                             Item = IDO.item,
                             ItemID = (int)IDO.itemid,
                             Color = IDO.Color,
                             ColorID = (int)IDO.colorid,
                             Size = IDO.size,
                             SizeID = (int)IDO.sizeid,
                             //Uom = IDO.,
                             OrderNo = IDO.Order_No,
                             ORefNo = IDO.Ref_No,
                             Styleid = IDO.Styleid,
                             OStyle = IDO.Style,
                             quantity = IDO.quantity,
                             BuyODetId = IDO.Buy_Ord_BOMDetid,
                             PurUomId = (int)IDO.Pur_UOMid,
                             BomQty = (decimal)IDO.BOM_Qty,
                             OBQty = (decimal)IDO.Order_Bal_Qty,
                             Indent_BuyJobid = IDO.Pur_Ord_BuyJobid,
                             IndentDetid = IDO.Indentdetid,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool ApprovalDetData(Indent_Mas objPoEEntry)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Indent_Mas.Where(c => c.IndentMasid == objPoEEntry.IndentMasid).FirstOrDefault();
                    if (App != null)
                    {


                        App.IndentNo = objPoEEntry.IndentNo;
                        App.IndentDate = objPoEEntry.IndentDate;
                        App.Companyid = objPoEEntry.Companyid;
                        App.Company_unitid = objPoEEntry.Company_unitid;
                        App.Purchase_Type = objPoEEntry.Purchase_Type;
                        App.Purchase_itemType = objPoEEntry.Purchase_itemType;
                        App.Remarks = objPoEEntry.Remarks;
                        App.Cancel = objPoEEntry.Cancel;
                        App.Closed = "N";
                        App.Approved = objPoEEntry.Approved;
                        App.EmployeeId = objPoEEntry.EmployeeId;
                        App.Departmentid = objPoEEntry.Departmentid;
                        App.SectionID = objPoEEntry.SectionID;
                        //CurrencyId=POIEntry.CurrencyId,
                        App.CurrencyId = null;
                        App.IndentType = objPoEEntry.IndentType;
                        App.IndentMasid = objPoEEntry.IndentMasid;
                    }
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


        public bool RevertData(Indent_Mas objPoREntry)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Indent_Mas.Where(c => c.IndentMasid == objPoREntry.IndentMasid).FirstOrDefault();
                    if (App != null)
                    {


                        App.IndentNo = objPoREntry.IndentNo;
                        App.IndentDate = objPoREntry.IndentDate;
                        App.Companyid = objPoREntry.Companyid;
                        App.Company_unitid = objPoREntry.Company_unitid;
                        App.Purchase_Type = objPoREntry.Purchase_Type;
                        App.Purchase_itemType = objPoREntry.Purchase_itemType;
                        App.Remarks = objPoREntry.Remarks;
                        App.Cancel = objPoREntry.Cancel;
                        App.Closed = "N";
                        App.Approved = objPoREntry.Approved;
                        App.EmployeeId = objPoREntry.EmployeeId;
                        App.Departmentid = objPoREntry.Departmentid;
                        App.SectionID = objPoREntry.SectionID;
                        //CurrencyId=POIEntry.CurrencyId,
                        App.CurrencyId = null;
                        App.IndentType = objPoREntry.IndentType;
                        App.IndentMasid = objPoREntry.IndentMasid;
                    }
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
