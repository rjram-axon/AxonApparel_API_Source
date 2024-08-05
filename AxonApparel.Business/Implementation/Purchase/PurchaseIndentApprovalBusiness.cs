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
    public class PurchaseIndentApprovalBusiness : IPurchaseIndentApprovalBusiness
    {

        IPurchaseIndentApprovalRepository GRep = new PurchaseIndentApprovalRepository();

        
        public Response<IQueryable<PurchaseIndentApprovalMas>> GetDataIndMainOrderRefDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataIndMoRepDetails(Companyid, Purchase_Type, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseIndentApprovalMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentApprovalMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentApprovalMas>> GetDataIndMainIndEmpDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataIndMIRepDetails(Companyid, Purchase_Type, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseIndentApprovalMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentApprovalMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentApprovalMas>> GetDataIndMainStatusDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = GRep.GetDataIndMSRepDetails(Companyid, Purchase_Type, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseIndentApprovalMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentApprovalMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseIndentApprovalMas>> GetDataPurIndMainAppDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate, string AppType)
        {
            try
            {
                var PWO = GRep.GetDataPurIndMainDetails(OrdNo, RefNo, Company_unitid, Companyid, SectionID, EmployeeId, IndentMasid, Purchase_Type, FrmDate, ToDate, AppType);
                return new Response<IQueryable<PurchaseIndentApprovalMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentApprovalMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseIndentApprovalMas>> GetIndEditDetails(int Id)
        {
            try
            {
                var ProdutWO = GRep.GetDataRepEditIndDetails(Id);

                return new Response<IQueryable<PurchaseIndentApprovalMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseIndentApprovalMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurchaseIndentApprovalDet>> GetEditIndDetDetails(string IndentMasid, string Purchase_Type)
        {
            try
            {
                var CurRGList = GRep.GetRepEntryEditIndItemLoad(IndentMasid, Purchase_Type);

                return new Response<IList<PurchaseIndentApprovalDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentApprovalDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PurchaseIndentApprovalOrder>> GetEditIndOrdDetails(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type)
        {
            try
            {
                var CurRGListOrder = GRep.GetRepEntryEditIndOrderLoad(IndentMasid, OItemid, OColorid, OSizeid, OUomid, Purchase_Type);

                return new Response<IList<PurchaseIndentApprovalOrder>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PurchaseIndentApprovalOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> AppPoIndEntry(PurchaseIndentApprovalMas PoEEntry)
        {
            int? CurID = 0;
            string Remarks = "";


            if (PoEEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = PoEEntry.CurrencyId;
            }
            if (PoEEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = PoEEntry.Remarks;
            }

            try
            {

                AxonApparel.Repository.Indent_Mas purIndEdit = new AxonApparel.Repository.Indent_Mas
                {

                    IndentNo = PoEEntry.IndentNo,
                    IndentDate = PoEEntry.IndentDate,
                    Companyid = PoEEntry.Companyid,
                    Company_unitid = PoEEntry.Company_unitid,
                    Purchase_Type = PoEEntry.Purchase_Type,
                    Purchase_itemType = PoEEntry.Purchase_itemType,
                    Remarks = PoEEntry.Remarks,
                    Cancel = PoEEntry.Cancel,
                    Closed = "N",
                    Approved = PoEEntry.Approved,
                    EmployeeId = PoEEntry.EmployeeId,
                    Departmentid = PoEEntry.Departmentid,
                    SectionID = PoEEntry.SectionID,
                    //CurrencyId=POIEntry.CurrencyId,
                    CurrencyId = null,
                    IndentType = PoEEntry.IndentType,
                    IndentMasid = PoEEntry.IndentMasid,
                };
                
                var result = GRep.ApprovalDetData(purIndEdit);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> RevPoIndEntry(PurchaseIndentApprovalMas PoDEntry)
        {
            int? CurID = 0;
            string Remarks = "";

            if (PoDEntry.CurrencyId == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = PoDEntry.CurrencyId;
            }
            if (PoDEntry.Remarks == null)
            {
                Remarks = null;
            }
            else
            {
                Remarks = PoDEntry.Remarks;
            }

            try
            {
                AxonApparel.Repository.Indent_Mas purIndEdit = new AxonApparel.Repository.Indent_Mas
                {

                    IndentNo = PoDEntry.IndentNo,
                    IndentDate = PoDEntry.IndentDate,
                    Companyid = PoDEntry.Companyid,
                    Company_unitid = PoDEntry.Company_unitid,
                    Purchase_Type = PoDEntry.Purchase_Type,
                    Purchase_itemType = PoDEntry.Purchase_itemType,
                    Remarks = PoDEntry.Remarks,
                    Cancel = PoDEntry.Cancel,
                    Closed = "N",
                    Approved = PoDEntry.Approved,
                    EmployeeId = PoDEntry.EmployeeId,
                    Departmentid = PoDEntry.Departmentid,
                    SectionID = PoDEntry.SectionID,
                    //CurrencyId=POIEntry.CurrencyId,
                    CurrencyId = null,
                    IndentType = PoDEntry.IndentType,
                    IndentMasid = PoDEntry.IndentMasid,

                };
                
                var result = GRep.RevertData(purIndEdit);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



    }
}
