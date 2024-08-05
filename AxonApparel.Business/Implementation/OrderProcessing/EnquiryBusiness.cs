using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public class EnquiryBusiness : IEnquiryBusiness
    {
        IEnquiryRepository enRep = new EnquiryRepository();


        public Response<IQueryable<Enquiry>> GetEnquiry(int? companyId, string EntryNo, int? buyerId, int? styleId, string fromDate, string toDate)
        {
            try
            {
                var EnqList = enRep.GetDataList(companyId, EntryNo, buyerId, styleId, fromDate, toDate);

                return new Response<IQueryable<Enquiry>>(EnqList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Enquiry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Enquiry> GetDataById(int EnquiryId)
        {
            try
            {
           
                var eno = enRep.GetDataById(EnquiryId);
                
                return new Response<Domain.Enquiry>(new Domain.Enquiry
                {
                    EnquiryId = eno.EnquiryId,
                    EnquiryNo = eno.EnquiryNo,
                    EnqDate = (DateTime)eno.EnqDate,
                    CompanyId = eno.CompanyId,
                    BuyerId = eno.BuyerId,
                    BuyerRef = eno.BuyerRef,
                    RefDate = (DateTime)eno.RefDate,
                    TermsId = eno.TermsId,
                    DespDate = (DateTime)eno.DespDate,
                    Remarks = eno.Remarks,
                    Despatched_closed = eno.Despatched_closed,
                    Sampling = eno.Sampling,
                    Ordered = eno.Ordered,
                    Status = eno.Status,
                    ShipSystemId = (int)eno.ShipSystemId,
                    SeasonId = (int)eno.SeasonId,
                    CreatedBy = (int)eno.CreatedBy,
                    EnquiryStyle = eno.MarkEnqStyle.Select(h => new Domain.EnquiryStyle() { EnquiryStyleId = h.EnquiryStyleId, EnquiryId = h.EnquiryID, ContactPerson = h.ContactPerson, Department = h.Department, BuyerStyle = h.BuyerStyle, Quantity = h.Quantity, StyleDesc = h.StyleDesc, ShipmentModeId = (int)h.ShipModeId, SeasonId = h.Season, StyleId = h.StyleId, GUomId = h.GUomId, GUomConv = h.GUomConv }).ToList(),
                    EnquiryItem = eno.MarkEnqItemDet.Select(h => new Domain.EnquiryItem() { EnquiryId = h.EnquiryId, MarkEnqItemId = h.MarkEnqItemId, Color = h.Color.Color1, ColorId = h.ColorId, SizeId = h.SizeId, Size = h.Size.size1, Uom = h.Garment_Uom.GUom, UomId = h.UomId, Quantity = h.Quantity }).ToList(),
                    EnquiryFabric = eno.MarkEnqFabric.Select(h => new Domain.EnquiryFabric() { MarkEnqFabricId = h.MarkEnqFabricId,EnquiryID=h.EnquiryID, FabricId = h.FabricId, Fabric = h.Item.Item1, SizeId = (int)h.SizeId, Size = h.Size.size1, ColorId = h.ColorId, Color = h.Color.Color1, Counts = h.Counts, GSM = h.GSM, Composition = h.Composition, FabDesc = h.FabDesc }).ToList(),
                    EnquiryEmbPrint = eno.MarkEnqEmbPrint.Select(h => new Domain.EnquiryEmbPrint() { MarkEnqEmbPrintId = h.MarkEnqEmbPrintId,EnquiryID=h.EnquiryID, EmbNo = h.EmbNo, EmbDesc = h.EmbDesc, EmbSize = h.EmbSize, EmbPlacement = h.EmbPlacement, EmbStiches = (int)h.EmbStiches, EmbColors = (int)h.EmbColors, EmbType = h.EmbType, Emb_or_Prn = h.Emb_or_Prn }).Where(h => h.Emb_or_Prn == "E").ToList(),
                    EnquiryPrint = eno.MarkEnqEmbPrint.Select(h => new Domain.EnquiryPrint() { MarkEnqEmbPrintId = h.MarkEnqEmbPrintId,EnquiryID=h.EnquiryID, PrnNo = h.PrnNo, PrnDesc = h.PrnDesc, PrnSize = h.PrnSize, PrnPlacement = h.PrnPlacement, PrnType = (int)h.PrnType, PrnColors = (int)h.PrnColors, PrnQlty = (int)h.PrnQlty, Emb_or_Prn = h.Emb_or_Prn }).Where(h => h.Emb_or_Prn == "P").ToList(),
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Enquiry>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        //modify by Bala

        public Response<bool> CreateEnquiry(Enquiry enq)
        {
            try
            {
                var EnqMasterId = enRep.AddData(new AxonApparel.Repository.MarkEnqMas
                {
                    EnquiryId = enq.EnquiryId,
                    EnquiryNo = enq.EnquiryNo,
                    EnqDate = enq.EnqDate,
                    CompanyId = enq.CompanyId,
                    BuyerId = enq.BuyerId,
                    BuyerRef = enq.BuyerRef,
                    RefDate = enq.RefDate,
                    TermsId = enq.TermsId,
                    DespDate = enq.DespDate,
                    Remarks = "TEST",//enq.Remarks,
                    Despatched_closed = "Y",// enq.Despatched_closed,
                    Sampling = "Y",//enq.Sampling,
                    Ordered = "Y",//enq.Ordered,
                    Status = "E",//enq.Status,
                    ShipSystemId = enq.ShipSystemId,
                    SeasonId = enq.SeasonId,
                    CreatedBy = enq.CreatedBy,

                });

                int? quotId = 0;
                if (enq.QuotaCateId == 0)
                {
                    quotId = null;
                }
                else
                {
                    quotId = enq.QuotaCateId;
                }
                //markbuystyle 
                var EnquiryMasStyleId = enRep.AddStyleData(new AxonApparel.Repository.MarkEnqStyle
                {
                    EnquiryStyleId = enq.EnquiryStyleId,
                    EnquiryID = EnqMasterId,
                    StyleId = enq.StyleId,
                    BuyerStyle = enq.BuyerStyle,
                    StyleDesc = enq.StyleDesc,
                    QuotaCateId = quotId,
                    Quantity = enq.Quantity,
                    GUomId = enq.GUomId,
                    GUomConv = enq.GUomConv,
                    ContactPerson = enq.ContactPerson,
                    ShipModeId = enq.ShipModeId,
                    Department = enq.Department,
                    Season = enq.Season,

                });


                var ItemList = new List<MarkEnqItemDet>();

                foreach (var item in enq.EnquiryItem)
                {
                    ItemList.Add(new MarkEnqItemDet
                    {
                        EnquiryId = EnqMasterId,
                        ColorId = item.ColorId,
                        SizeId = item.SizeId,
                        UomId = item.UomId,
                        Quantity = item.Quantity,
                        DespatchQty = item.DespatchQty,
                    });
                }
                var result = enRep.AddItemData(ItemList);
                //

                var FabricList = new List<MarkEnqFabric>();

                foreach (var Fabric in enq.EnquiryFabric)
                {
                    FabricList.Add(new MarkEnqFabric
                    {

                        EnquiryID = EnqMasterId,
                        FabricId = Fabric.FabricId,
                        ColorId = Fabric.ColorId,
                        SizeId = Fabric.SizeId,
                        GSM = Fabric.GSM,
                        Composition = Fabric.Composition,
                        FabDesc = Fabric.FabDesc,
                        Counts = Fabric.Counts,
                    });
                }
                var result1 = enRep.AddFabricData(FabricList);
                //
                var embList = new List<MarkEnqEmbPrint>();

                foreach (var embPrint in enq.EnquiryEmbPrint)
                {
                    embList.Add(new MarkEnqEmbPrint
                    {

                        EnquiryID = EnqMasterId,
                        EmbDesc = embPrint.EmbDesc,
                        EmbSize = embPrint.EmbSize,
                        EmbPlacement = embPrint.EmbPlacement,
                        EmbColors = embPrint.EmbColors,
                        EmbStiches = embPrint.EmbStiches,
                        EmbType = embPrint.EmbType,
                        PrnDesc = embPrint.PrnDesc,
                        PrnSize = embPrint.PrnSize,
                        PrnPlacement = embPrint.PrnPlacement,
                        PrnColors = embPrint.PrnColors,
                        PrnType = embPrint.PrnType,
                        PrnQlty = embPrint.PrnQlty,
                        EmbNo = embPrint.EmbNo,
                        PrnNo = embPrint.PrnNo,
                        EmbImage = embPrint.EmbImage,
                        PrintImage = embPrint.PrintImage,
                        Emb_or_Prn = "E",
                    });
                }
                var result2 = enRep.AddEmbData(embList);

                //
                var printList = new List<MarkEnqEmbPrint>();

                foreach (var Print in enq.EnquiryPrint)
                {
                    printList.Add(new MarkEnqEmbPrint
                    {

                        EnquiryID = EnqMasterId,
                        EmbDesc = Print.EmbDesc,
                        EmbSize = Print.EmbSize,
                        EmbPlacement = Print.EmbPlacement,
                        EmbColors = Print.EmbColors,
                        EmbStiches = Print.EmbStiches,
                        EmbType = Print.EmbType,
                        PrnDesc = Print.PrnDesc,
                        PrnSize = Print.PrnSize,
                        PrnPlacement = Print.PrnPlacement,
                        PrnColors = Print.PrnColors,
                        PrnType = Print.PrnType,
                        PrnQlty = Print.PrnQlty,
                        EmbNo = Print.EmbNo,
                        PrnNo = Print.PrnNo,
                        EmbImage = Print.EmbImage,
                        PrintImage = Print.PrintImage,
                        Emb_or_Prn = "P",
                    });
                }
                var result3 = enRep.AddEmbData(printList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                return new Response<bool>(result1, Status.SUCCESS, "Fabric Saved Successfully");
                return new Response<bool>(result2, Status.SUCCESS, "Fabric Saved Successfully");
                return new Response<bool>(result3, Status.SUCCESS, "Fabric Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateEnquiry(Enquiry enq)
        {
       
            try
            {
                var result = false;
                if (enq.DelItemId != null)
                {
                    if (enq.DelItemId.Count > 0)
                    {
                        var resultIt = enRep.DeleteItem(enq.DelItemId);
                    }
                }
                if (enq.DelFabId != null)
                {
                    if (enq.DelFabId.Count > 0)
                    {
                        var resultFa = enRep.DeleteFabric(enq.DelFabId);
                    }
                }
                if (enq.DelEmbId != null)
                {
                    if (enq.DelEmbId.Count > 0)
                    {
                        var resultEm = enRep.DeleteEmp(enq.DelEmbId);
                    }
                }
                if (enq.DelPriId != null)
                {
                    if (enq.DelPriId.Count > 0)
                    {
                        var resultPr = enRep.DeletePrinting(enq.DelPriId);
                    }
                }
                var EnqMasterId = enRep.UpdateData(new AxonApparel.Repository.MarkEnqMas
                {
                    EnquiryId = enq.EnquiryId,
                    EnquiryNo = enq.EnquiryNo,
                    EnqDate = enq.EnqDate,
                    CompanyId = enq.CompanyId,
                    BuyerId = enq.BuyerId,
                    BuyerRef = enq.BuyerRef,
                    RefDate = enq.RefDate,
                    TermsId = enq.TermsId,
                    DespDate = enq.DespDate,
                    Remarks = "TEST",//enq.Remarks,
                    Despatched_closed = "Y",// enq.Despatched_closed,
                    Sampling = "Y",//enq.Sampling,
                    Ordered = "Y",//enq.Ordered,
                    Status = "E",//enq.Status,
                    ShipSystemId = enq.ShipSystemId,
                    SeasonId = enq.SeasonId,
                    CreatedBy = enq.CreatedBy,

                });

                int? quotId = 0;
                if (enq.QuotaCateId == 0)
                {
                    quotId = null;
                }
                else
                {
                    quotId = enq.QuotaCateId;
                }

                var EnqStyleId = enRep.UpdateStyleData(new AxonApparel.Repository.MarkEnqStyle
                {
                   // EnquiryStyleId = enq.EnquiryStyleId,
                    EnquiryID=enq.EnquiryId,
                    StyleId = enq.StyleId,
                    BuyerStyle = enq.BuyerStyle,
                    StyleDesc = enq.StyleDesc,
                    QuotaCateId = quotId,
                    Quantity = enq.Quantity,
                    GUomId = enq.GUomId,
                    GUomConv = enq.GUomConv,
                    ContactPerson = enq.ContactPerson,
                    ShipModeId = enq.ShipModeId,
                    Department = enq.Department,
                    Season = enq.Season,

                });

                var detailList = new List<MarkEnqEmbPrint>();
                if (enq.EnquiryEmbPrint != null)
                {
                    foreach (var emb in enq.EnquiryEmbPrint)
                    {
                        detailList.Add(new MarkEnqEmbPrint
                        {

                            MarkEnqEmbPrintId = emb.MarkEnqEmbPrintId,
                            EnquiryID = enq.EnquiryId,
                            EmbDesc = emb.EmbDesc,
                            EmbSize = emb.EmbSize,
                            EmbPlacement = emb.EmbPlacement,
                            EmbColors = emb.EmbColors,
                            EmbStiches = emb.EmbStiches,
                            EmbType = emb.EmbType,
                            PrnDesc = emb.PrnDesc,
                            PrnSize = emb.PrnSize,
                            PrnPlacement = emb.PrnPlacement,
                            PrnColors = emb.PrnColors,
                            PrnType = emb.PrnType,
                            PrnQlty = emb.PrnQlty,
                            EmbNo = emb.EmbNo,
                            PrnNo = emb.PrnNo,
                            EmbImage = emb.EmbImage,
                            PrintImage = emb.PrintImage,

                        });
                    }

                    var resultE = enRep.UpdateEmbData(detailList);
                    if (resultE == true)
                    {
                        result = true;
                    }

                    //Emb Add in Update Case 


                    var EmbList = new List<MarkEnqEmbPrint>();
                    if (enq.EnquiryPrint.Count > 0)
                    {
                        foreach (var emb in enq.EnquiryEmbPrint)
                        {
                            if (emb.MarkEnqEmbPrintId == 0)
                            {

                                EmbList.Add(new MarkEnqEmbPrint
                                {
                                    EnquiryID = enq.EnquiryId,
                                    EmbDesc = emb.EmbDesc,
                                    EmbSize = emb.EmbSize,
                                    EmbPlacement = emb.EmbPlacement,
                                    EmbColors = emb.EmbColors,
                                    EmbStiches = emb.EmbStiches,
                                    EmbType = emb.EmbType,
                                    PrnDesc = emb.PrnDesc,
                                    PrnSize = emb.PrnSize,
                                    PrnPlacement = emb.PrnPlacement,
                                    PrnColors = emb.PrnColors,
                                    PrnType = emb.PrnType,
                                    PrnQlty = emb.PrnQlty,
                                    EmbNo = emb.EmbNo,
                                    PrnNo = emb.PrnNo,
                                    EmbImage = emb.EmbImage,
                                    PrintImage = emb.PrintImage,
                                    Emb_or_Prn = "E",
                                });
                            }
                        }
                        var result9 = enRep.AddEmbData(EmbList);
                    }

                }

                var detailPrintList = new List<MarkEnqEmbPrint>();
                if (enq.EnquiryPrint != null)
                {
                    foreach (var prt in enq.EnquiryPrint)
                    {
                        detailPrintList.Add(new MarkEnqEmbPrint
                        {

                            MarkEnqEmbPrintId = prt.MarkEnqEmbPrintId,
                            EmbDesc = prt.EmbDesc,
                            EmbSize = prt.EmbSize,
                            EmbPlacement = prt.EmbPlacement,
                            EmbColors = prt.EmbColors,
                            EmbStiches = prt.EmbStiches,
                            EmbType = prt.EmbType,
                            PrnDesc = prt.PrnDesc,
                            PrnSize = prt.PrnSize,
                            PrnPlacement = prt.PrnPlacement,
                            PrnColors = prt.PrnColors,
                            PrnType = prt.PrnType,
                            PrnQlty = prt.PrnQlty,
                            EmbNo = prt.EmbNo,
                            PrnNo = prt.PrnNo,
                            EmbImage = prt.EmbImage,
                            PrintImage = prt.PrintImage,
                        });
                    }

                    var result1 = enRep.UpdatePrintData(detailPrintList);


                    //Print Add in Update Case 


                    var PrintList = new List<MarkEnqEmbPrint>();
                    if (enq.EnquiryPrint.Count > 0)
                    {
                        foreach (var prt in enq.EnquiryPrint)
                        {
                            if (prt.MarkEnqEmbPrintId == 0)
                            {

                                PrintList.Add(new MarkEnqEmbPrint
                                {
                                    EnquiryID = enq.EnquiryId,
                                    EmbDesc = prt.EmbDesc,
                                    EmbSize = prt.EmbSize,
                                    EmbPlacement = prt.EmbPlacement,
                                    EmbColors = prt.EmbColors,
                                    EmbStiches = prt.EmbStiches,
                                    EmbType = prt.EmbType,
                                    PrnDesc = prt.PrnDesc,
                                    PrnSize = prt.PrnSize,
                                    PrnPlacement = prt.PrnPlacement,
                                    PrnColors = prt.PrnColors,
                                    PrnType = prt.PrnType,
                                    PrnQlty = prt.PrnQlty,
                                    EmbNo = prt.EmbNo,
                                    PrnNo = prt.PrnNo,
                                    EmbImage = prt.EmbImage,
                                    PrintImage = prt.PrintImage,
                                    Emb_or_Prn = "P",
                                });
                            }
                        }
                        var result8 = enRep.AddEmbData(PrintList);
                    }
                }


                //Item Update in Edit Case 
                var detailItemList = new List<MarkEnqItemDet>();
                if (enq.EnquiryItem != null)
                {
                    foreach (var EnqIm in enq.EnquiryItem)
                    {
                        detailItemList.Add(new MarkEnqItemDet
                        {

                            MarkEnqItemId = EnqIm.MarkEnqItemId,
                            ColorId = EnqIm.ColorId,
                            SizeId = EnqIm.SizeId,
                            UomId = EnqIm.UomId,
                            Quantity = EnqIm.Quantity,
                            DespatchQty = EnqIm.DespatchQty,
                        });
                    }

                    var result2 = enRep.UpdateItemData(detailItemList);

                    //Item Add in Update Case 


                    var ItemList = new List<MarkEnqItemDet>();
                    if (enq.EnquiryItem.Count > 0)
                    {
                        foreach (var item in enq.EnquiryItem)
                        {
                            if (item.MarkEnqItemId == 0)
                            {

                                ItemList.Add(new MarkEnqItemDet
                                {
                                    EnquiryId = enq.EnquiryId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    UomId = item.UomId,
                                    Quantity = item.Quantity,
                                    DespatchQty = item.DespatchQty,
                                });
                            }
                        }
                        var result6 = enRep.AddItemData(ItemList);
                    }
                }

                //Fabric Update in Edit Case 

                var detailFabList = new List<MarkEnqFabric>();
                if (enq.EnquiryFabric != null)
                {
                    foreach (var EnqFab in enq.EnquiryFabric)
                    {
                        detailFabList.Add(new MarkEnqFabric
                        {
                            MarkEnqFabricId = EnqFab.MarkEnqFabricId,
                            FabricId = EnqFab.FabricId,
                            ColorId = EnqFab.ColorId,
                            SizeId = EnqFab.SizeId,
                            GSM = EnqFab.GSM,
                            Composition = EnqFab.Composition,
                            FabDesc = EnqFab.FabDesc,
                            Counts = EnqFab.Counts,
                        });
                    }

                    var result3 = enRep.UpdateFabricData(detailFabList);

                    //Fabric Add in Edit Case 
                    var FbList = new List<MarkEnqFabric>();
                    if (enq.EnquiryFabric.Count > 0)
                    {
                        foreach (var Fab in enq.EnquiryFabric)
                        {
                            if (Fab.MarkEnqFabricId == 0)
                            {

                                FbList.Add(new MarkEnqFabric
                                {
                                    EnquiryID = enq.EnquiryId,
                                    FabricId = Fab.FabricId,
                                    ColorId = Fab.ColorId,
                                    SizeId = Fab.SizeId,
                                    GSM = Fab.GSM,
                                    Composition = Fab.Composition,
                                    FabDesc = Fab.FabDesc,
                                    Counts = Fab.Counts,
                                });
                            }
                        }
                        var result7 = enRep.AddFabricData(FbList);
                    }
                }
                
                //if (enq.DelFabId.Count > 0)
                //{
                //    var resultFa = enRep.DeleteFabric(enq.DelFabId);
                //}
                //if (enq.DelEmbId.Count > 0)
                //{
                //    var resultEm = enRep.DeleteEmp(enq.DelEmbId);
                //}
                //if (enq.DelPriId.Count > 0)
                //{
                //    var resultPr = enRep.DeletePrinting(enq.DelPriId);
                //}

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEnquiry(int EnquiryId)
        {
            return new Response<bool>(enRep.DeleteData(EnquiryId), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<int> CreateStyleEnquiry(Enquiry enq)
        {
            try
            {
                return new Response<int>(enRep.AddStyleData(new AxonApparel.Repository.MarkEnqStyle
                {
                    EnquiryStyleId = enq.EnquiryStyleId,
                    EnquiryID = enq.EnquiryId,
                    StyleId = enq.StyleId,
                    BuyerStyle = enq.BuyerStyle,
                    StyleDesc = enq.StyleDesc,
                    QuotaCateId = 1,
                    Quantity = enq.Quantity,
                    GUomId = enq.GUomId,
                    GUomConv = 1,
                    ContactPerson = enq.ContactPerson,
                    ShipModeId = enq.ShipModeId,
                    Department = enq.Department,
                    Season = enq.Season,
                }), Status.SUCCESS, "Added Successfully");


            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Enquiry>> GetEntryNoList()
        {
            try
            {
                var OrdList = enRep.GetEntryNoDataList();
                return new Response<IQueryable<Enquiry>>(OrdList.Select(m => new Enquiry
                {
                    EnquiryId = m.EnquiryId,
                    EnquiryNo = m.EnquiryNo,
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Enquiry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Enquiry>> GetBuyRefNo()
        {
            try
            {
                var OrdList = enRep.GetBuyRefNoDataList();
                return new Response<IQueryable<Enquiry>>(OrdList.Select(m => new Enquiry
                {
                   
                    BuyerRef = m.BuyerRef
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Enquiry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        
    }
}
