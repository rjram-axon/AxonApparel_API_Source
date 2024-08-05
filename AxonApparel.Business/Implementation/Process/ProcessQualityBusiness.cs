using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class ProcessQualityBusiness:IProcessQualityBusiness
    {
        IProcessQualityRepository repo = new ProcessQualityRepository();

        public Response<IList<Domain.ProcQltyDet>> GetEntryItemLoad(int RecptMasid)
        {
            try
            {
                var ProductWO = repo.GetEntryItemLoad(RecptMasid);

                return new Response<IList<Domain.ProcQltyDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProcQltyDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProcQltyJobDet>> GetEntryJobDetLoad(int RecptMasid)
        {
            try
            {
                var ProductWO = repo.GetEntryJobDetLoad(RecptMasid);

                return new Response<IList<Domain.ProcQltyJobDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProcQltyJobDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProcQltyStock>> GetEntryStockLoad(int RecptMasid)
        {
            try
            {
                var ProductWO = repo.GetEntryStockLoad(RecptMasid);

                return new Response<IList<Domain.ProcQltyStock>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProcQltyStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.ProcQltyMas MasEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Qlty_mas ProcInsert = new AxonApparel.Repository.Process_Qlty_mas

                {
                   Proc_qlty_Masid=MasEntry.Proc_qlty_Masid,
                   Proc_qlty_date=MasEntry.Proc_qlty_date,
                   Proc_Qlty_no=MasEntry.Proc_Qlty_no,
                   Proc_Recpt_no=MasEntry.Proc_Recpt_no,
                   Remarks=MasEntry.Remarks,
                   NetAmount=MasEntry.NetAmount,
                   GrossAmount=MasEntry.GrossAmount,
                   DebtRaised=MasEntry.DebtRaised


                    //Process_Recpt_Return = ItmList

                };

                var ItmList = new List<Process_Qlty_det>();

                if (MasEntry.ProdDet != null)
                {
                    foreach (var PItem in MasEntry.ProdDet)
                    {
                        ItmList.Add(new Process_Qlty_det
                        {

                            Proc_Qlty_detid=PItem.Proc_Qlty_detid,
                            Proc_qlty_Masid=PItem.Proc_qlty_Masid,
                            Prod_Recpt_detid=PItem.Prod_Recpt_detid,
                            itemid=PItem.itemid,
                            Colorid=PItem.Colorid,
                            Sizeid=PItem.Sizeid,
                            Debit_Rate=PItem.Debit_Rate,
                            DebitQty=PItem.DebitQty,
                            AcptQty=PItem.AcptQty,
                            Rate=PItem.Rate,
                            Amount=PItem.Amount
                        });
                    }

                }

                var jobItmList = new List<Process_Qlty_Jobdet>();

                if (MasEntry.ProdJobDet != null)
                {
                    foreach (var PItem in MasEntry.ProdJobDet)
                    {
                        jobItmList.Add(new Process_Qlty_Jobdet
                        {

                           Proc_qlty_Detid=PItem.Proc_qlty_Detid,
                           Proc_qlty_jobDetid=PItem.Proc_Recpt_jobDetid,
                           Proc_Recpt_jobDetid=PItem.Proc_Recpt_jobDetid,
                           AcptQty=PItem.AcptQty,
                           DebitQty=PItem.DebitQty,
                           DbtProcessId=PItem.DbtProcessId,
                           DbtProcessorId=PItem.DbtProcessorId
                        });
                    }
                }
                var StkItmList = new List<Process_Qlty_Stock>();

                if (MasEntry.ProdStock != null)
                {
                    foreach (var PItem in MasEntry.ProdStock)
                    {
                        StkItmList.Add(new Process_Qlty_Stock
                        {

                           Proc_qlty_jobDetid=PItem.Proc_qlty_jobDetid,
                           Proc_Recpt_jobdetid=PItem.Proc_Recpt_jobdetid,
                           Stockid=PItem.Stockid,
                           Rejectedqty=PItem.Rejectedqty,
                           JobRowid=PItem.JobRowid
                        });
                    }
                }

                var Drcr = new List<Process_Qlty_DrCr>();

                if (MasEntry.ProdDrcr != null)
                {
                    foreach (var PItem in MasEntry.ProdDrcr)
                    {
                        Drcr.Add(new Process_Qlty_DrCr
                        {

                          Proc_Qlty_DrCrid=PItem.Proc_Qlty_DrCrid,
                          Proc_qlty_Masid=PItem.Proc_qlty_Masid,
                          Amount=PItem.Amount,
                          QltyRemarks=PItem.QltyRemarks
                        });
                    }
                }
                var result = repo.Add(ProcInsert, ItmList, jobItmList, StkItmList, Drcr, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.ProcQltyMas>> GetDataQltyEditDetails(int Id)
        {
            try
            {
                var ProdutWO = repo.GetDataRepQltyEditDetails(Id);

                return new Response<IQueryable<Domain.ProcQltyMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcQltyMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProcQltyJobDet>> GetItemQltyEditDetails(int RecptMasid)
        {
            try
            {
                var CRGList = repo.GetRepEntryQltyEditItemLoad(RecptMasid);

                return new Response<IList<Domain.ProcQltyJobDet>>(CRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.ProcQltyJobDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProcQltyStock>> GetStockQltyEditDetails(int RecptMasid)
        {
            try
            {
                var CurRGListOrder = repo.GetRepQltyEditStockLoad(RecptMasid);

                return new Response<IList<Domain.ProcQltyStock>>(CurRGListOrder, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.ProcQltyStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateEntry(Domain.ProcQltyMas UEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Qlty_mas ProcUpdate = new AxonApparel.Repository.Process_Qlty_mas

                {
                    Proc_qlty_Masid = UEntry.Proc_qlty_Masid,
                    Proc_qlty_date = UEntry.Proc_qlty_date,
                    Proc_Qlty_no = UEntry.Proc_Qlty_no,
                    Proc_Recpt_no = UEntry.Proc_Recpt_no,
                    Remarks = UEntry.Remarks,
                    NetAmount = UEntry.NetAmount,
                    GrossAmount = UEntry.GrossAmount,
                    DebtRaised = UEntry.DebtRaised


                    //Process_Recpt_Return = ItmList

                };

                var EItmList = new List<Process_Qlty_det>();

                if (UEntry.ProdDet != null)
                {
                    foreach (var PItem in UEntry.ProdDet)
                    {
                        EItmList.Add(new Process_Qlty_det
                        {

                            Proc_Qlty_detid = PItem.Proc_Qlty_detid,
                            Proc_qlty_Masid = PItem.Proc_qlty_Masid,
                            Prod_Recpt_detid = PItem.Prod_Recpt_detid,
                            itemid = PItem.itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Debit_Rate = PItem.Debit_Rate,
                            DebitQty = PItem.DebitQty,
                            AcptQty = PItem.AcptQty,
                            Rate = PItem.Rate,
                            Amount = PItem.Amount,
                            uomid=PItem.uomid,
                            
                        });
                    }

                }

                var EjobItmList = new List<Process_Qlty_Jobdet>();

                if (UEntry.ProdJobDet != null)
                {
                    foreach (var PItem in UEntry.ProdJobDet)
                    {
                        EjobItmList.Add(new Process_Qlty_Jobdet
                        {

                            Proc_qlty_Detid = PItem.Proc_qlty_Detid,
                            Proc_qlty_jobDetid = PItem.Proc_Recpt_jobDetid,
                            Proc_Recpt_jobDetid = PItem.Proc_Recpt_jobDetid,
                            AcptQty = PItem.AcptQty,
                            DebitQty = PItem.DebitQty,
                            DbtProcessId = PItem.DbtProcessId,
                            DbtProcessorId = PItem.DbtProcessorId
                        });
                    }
                }
                var EStkItmList = new List<Process_Qlty_Stock>();

                if (UEntry.ProdStock != null)
                {
                    foreach (var PItem in UEntry.ProdStock)
                    {
                        EStkItmList.Add(new Process_Qlty_Stock
                        {

                            Proc_qlty_jobDetid = PItem.Proc_qlty_jobDetid,
                            Proc_Recpt_jobdetid = PItem.Proc_Recpt_jobdetid,
                            Stockid = PItem.Stockid,
                            Rejectedqty = PItem.Rejectedqty,
                            JobRowid = PItem.JobRowid
                        });
                    }
                }

                var EDrcr = new List<Process_Qlty_DrCr>();

                if (UEntry.ProdDrcr != null)
                {
                    foreach (var PItem in UEntry.ProdDrcr)
                    {
                        EDrcr.Add(new Process_Qlty_DrCr
                        {

                            Proc_Qlty_DrCrid = PItem.Proc_Qlty_DrCrid,
                            Proc_qlty_Masid = PItem.Proc_qlty_Masid,
                            Amount = PItem.Amount,
                            QltyRemarks = PItem.QltyRemarks
                        });
                    }
                }
                var result = repo.UpdateData(ProcUpdate, EItmList, EjobItmList, EStkItmList, EDrcr, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Response<bool> DeleteEntry(Domain.ProcQltyMas DEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Qlty_mas ProcDelete = new AxonApparel.Repository.Process_Qlty_mas

                {
                    Proc_qlty_Masid = DEntry.Proc_qlty_Masid,
                    Proc_qlty_date = DEntry.Proc_qlty_date,
                    Proc_Qlty_no = DEntry.Proc_Qlty_no,
                    Proc_Recpt_no = DEntry.Proc_Recpt_no,
                    Remarks = DEntry.Remarks,
                    NetAmount = DEntry.NetAmount,
                    GrossAmount = DEntry.GrossAmount,
                    DebtRaised = DEntry.DebtRaised


                    //Process_Recpt_Return = ItmList

                };

                var DItmList = new List<Process_Qlty_det>();

                if (DEntry.ProdDet != null)
                {
                    foreach (var PItem in DEntry.ProdDet)
                    {
                        DItmList.Add(new Process_Qlty_det
                        {

                            Proc_Qlty_detid = PItem.Proc_Qlty_detid,
                            Proc_qlty_Masid = PItem.Proc_qlty_Masid,
                            Prod_Recpt_detid = PItem.Prod_Recpt_detid,
                            itemid = PItem.itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Debit_Rate = PItem.Debit_Rate,
                            DebitQty = PItem.DebitQty,
                            AcptQty = PItem.AcptQty,
                            Rate = PItem.Rate,
                            Amount = PItem.Amount
                        });
                    }

                }

                var DjobItmList = new List<Process_Qlty_Jobdet>();

                if (DEntry.ProdJobDet != null)
                {
                    foreach (var PItem in DEntry.ProdJobDet)
                    {
                        DjobItmList.Add(new Process_Qlty_Jobdet
                        {

                            Proc_qlty_Detid = PItem.Proc_qlty_Detid,
                            Proc_qlty_jobDetid = PItem.Proc_Recpt_jobDetid,
                            Proc_Recpt_jobDetid = PItem.Proc_Recpt_jobDetid,
                            AcptQty = PItem.AcptQty,
                            DebitQty = PItem.DebitQty,
                            DbtProcessId = PItem.DbtProcessId,
                            DbtProcessorId = PItem.DbtProcessorId
                        });
                    }
                }
                var DStkItmList = new List<Process_Qlty_Stock>();

                if (DEntry.ProdStock != null)
                {
                    foreach (var PItem in DEntry.ProdStock)
                    {
                        DStkItmList.Add(new Process_Qlty_Stock
                        {

                            Proc_qlty_jobDetid = PItem.Proc_qlty_jobDetid,
                            Proc_Recpt_jobdetid = PItem.Proc_Recpt_jobdetid,
                            Stockid = PItem.Stockid,
                            Rejectedqty = PItem.Rejectedqty,
                            JobRowid = PItem.JobRowid
                        });
                    }
                }

                var DDrcr = new List<Process_Qlty_DrCr>();

                if (DEntry.ProdDrcr != null)
                {
                    foreach (var PItem in DEntry.ProdDrcr)
                    {
                        DDrcr.Add(new Process_Qlty_DrCr
                        {

                            Proc_Qlty_DrCrid = PItem.Proc_Qlty_DrCrid,
                            Proc_qlty_Masid = PItem.Proc_qlty_Masid,
                            Amount = PItem.Amount,
                            QltyRemarks = PItem.QltyRemarks
                        });
                    }
                }
                var result = repo.DeleteData(ProcDelete, DItmList, DjobItmList, DStkItmList, DDrcr, "Delete");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }
    }
}
