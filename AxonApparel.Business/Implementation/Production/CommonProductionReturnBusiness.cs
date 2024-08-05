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
    public class CommonProductionReturnBusiness:ICommonProductionReturnBusiness
    {
        ICommonProductionReturnRepository CommonProDet = new CommonProductionReturnRepository();

        public Response<IList<CommonProdReturn>> GetCommonProductionIssueDet(string InterorExter, int CompanyId, int Processorid, string OrderType, int OrdNo, int RefNo, int SupplierId, int StyleId, int IssueId)
        {
            try
            {
                var CommonProdDt = CommonProDet.GetCommonProductionMultipleIssueDet(InterorExter, CompanyId, Processorid, OrderType, OrdNo, RefNo, SupplierId, StyleId, IssueId).ToList();

                return new Response<IList<CommonProdReturn>>(CommonProdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProdReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<CommonProdReturn>> GetCommonProductionReceiptDet(string ProdIssueId)
        {
            try
            {
                var CommonProdDt = CommonProDet.GetCommonProductionReceiptDet(ProdIssueId).ToList();

                return new Response<IList<CommonProdReturn>>(CommonProdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProdReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<CommonProdReturn>> GetCommonProdRecptDetforEdit(int ReturnId)
        {
            try
            {
                var CommonProdDt = CommonProDet.GetCommonProdRecptDetEditMode(ReturnId).ToList();

                return new Response<IList<CommonProdReturn>>(CommonProdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProdReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Prod_Return_Reason>> GetCommonProdRetReasonEditMode(int ReturnId)
        {
            try
            {
                var CommonProdDt = CommonProDet.GetCommonProdRetReasonEditMode(ReturnId).ToList();

                return new Response<IList<Domain.Prod_Return_Reason>>(CommonProdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Prod_Return_Reason>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Common.Response<bool> CreateProductionReturn(Domain.ProductionReturnMas ProductionReturnAdd)
        {
            //Insert into Prod_Recpt_mas
            var ProductionReturn = CommonProDet.AddProductionReturn(new Domain.ProductionReturnMas
            {
                ReturnNo = ProductionReturnAdd.ReturnNo,
                ReturnDate = ProductionReturnAdd.ReturnDate,
                RefNo = ProductionReturnAdd.RefNo,
                RefDate = ProductionReturnAdd.RefDate,
                CompanyId = ProductionReturnAdd.CompanyId,                
                Remarks = ProductionReturnAdd.Remarks,
                CreatedBy = ProductionReturnAdd.CreatedBy,                
                ProcessId = ProductionReturnAdd.ProcessId,
                InterExter = ProductionReturnAdd.InterExter,
                StoreUnitId = ProductionReturnAdd.StoreUnitId,
                WorkDivId = ProductionReturnAdd.WorkDivId,
                IssueType = ProductionReturnAdd.IssueType,
                ProdReturnDet=ProductionReturnAdd.ProdReturnDet,
                Prodretreason = ProductionReturnAdd.Prodretreason
            });
            if (ProductionReturn)
            {
                return new Response<bool>(ProductionReturn, Status.SUCCESS, "Saved Successfully");
            }
            else
            {
                return new Response<bool>(ProductionReturn, Status.ERROR, "");
            }
        }

        public Common.Response<bool> UpdateProductionReturn(Domain.ProductionReturnMas ProductionReturnUpd)
        {
            //Update into Prod_Recpt_mas
            var ProductionReturn = CommonProDet.UpdateProductionReturn(new Domain.ProductionReturnMas
            {
                ReturnId = ProductionReturnUpd.ReturnId,
                ReturnNo = ProductionReturnUpd.ReturnNo,
                ReturnDate = ProductionReturnUpd.ReturnDate,
                RefNo = ProductionReturnUpd.RefNo,
                RefDate = ProductionReturnUpd.RefDate,
                CompanyId = ProductionReturnUpd.CompanyId,
                Remarks = ProductionReturnUpd.Remarks,
                CreatedBy = ProductionReturnUpd.CreatedBy,
                ProcessId = ProductionReturnUpd.ProcessId,
                InterExter = ProductionReturnUpd.InterExter,
                StoreUnitId = ProductionReturnUpd.StoreUnitId,
                WorkDivId = ProductionReturnUpd.WorkDivId,
                IssueType = ProductionReturnUpd.IssueType,
                ProdReturnDet = ProductionReturnUpd.ProdReturnDet,
                Prodretreason = ProductionReturnUpd.Prodretreason
            });
            if (ProductionReturn)
            {
                return new Response<bool>(ProductionReturn, Status.SUCCESS, "Saved Successfully");
            }
            else
            {
                return new Response<bool>(ProductionReturn, Status.ERROR, "");
            }
        }

        public Response<bool> DeleteCommProdReturn(int ProdReturnid, List<ProductionReturnDet> returndetail)
        {
            try
            {
                return new Response<bool>(CommonProDet.DeleteReturn(ProdReturnid, returndetail), Status.SUCCESS, "Deleted Successfully");
            }
            catch (Exception ex)
            {
                return new Response<bool>(false, Status.ERROR, "Deleted Failed");
            }
        }


        public Response<IList<Domain.ProductionReturnMainDetail>> GetMaindt(int CompId, string Fromdate, string Todate, string RecptType, string InterExter, string OrderNo, int ProcessId, string RefNo, int ReturnId, string PrgNo, string OType)
        {
            try
            {
                var getmaindt = CommonProDet.GetMainData(CompId, Fromdate, Todate, InterExter, OrderNo, ProcessId, RefNo, ReturnId, PrgNo, OType);

                return new Response<IList<Domain.ProductionReturnMainDetail>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProductionReturnMainDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProductionReturnMas>> GetCommProdReturnHeaderInformation(int ProdReturnId)
        {
            try
            {
                var CuttingHeaderDetails = CommonProDet.GetCommonProductionHeaderInfo(ProdReturnId);

                return new Response<IQueryable<ProductionReturnMas>>(CuttingHeaderDetails, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionReturnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
