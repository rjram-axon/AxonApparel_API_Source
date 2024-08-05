CREATE TABLE [dbo].[Process_Recpt_Jobdet]
(
[Proc_Recpt_JobDetid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Proc_Recpt_Detid] [int] NULL,
	[Proc_Recpt_Masid] [int] NULL,
	[Job_Ord_No] [varchar](20) NOT NULL,
	[ProdPrgNo] [varchar](20) NOT NULL,
	[Received_Qty] [numeric](14, 3) NOT NULL,
	[LotNo] [varchar](20) NULL,
	[Sec_Qty] [numeric](14, 3) NOT NULL,
	[DisRowId] [int] NULL,
	[ProcessOrdDetid] [int] NULL,
	[ProcessOrdJobDetid] [int] NULL,
	[LotRowid] [int] NULL,
	[IssLot] [varchar](20) NOT NULL  DEFAULT (''),
	Itemid int null,
	Colorid int null,
	Sizeid int null,
	[Invoice_Qty] [numeric](14, 3) NULL CHECK  (([Invoice_Qty] = 0 or [Invoice_Qty] > 0)) DEFAULT (0),
	CONSTRAINT [FK_Process_ord_mas_Proc_Recpt_Detid]  FOREIGN KEY([Proc_Recpt_Detid]) REFERENCES [dbo].[Process_Recpt_Det] ([Proc_Recpt_Detid]),
	CONSTRAINT [FK_Proc_Recpt_JobDet_ProcessOrdDetID] FOREIGN KEY([ProcessOrdDetid]) REFERENCES [dbo].[Process_Ord_Det] ([processorddetid]),
	CONSTRAINT [FK_Proc_Recpt_JobDet_ProcessOrdJobDetID] FOREIGN KEY([ProcessOrdJobDetid]) REFERENCES [dbo].[Process_Ord_JobDet] ([ProcessJobDetid])
	)
GO

	

CREATE TRIGGER [dbo].[UpdateProcReceipt] ON [dbo].[Process_Recpt_JobDet] 
FOR INSERT 
AS 

Declare @Supplierid int 
Declare @Itemid int 
Declare @Colorid int 
Declare @Sizeid int 
Declare @RecSizeid int 
Declare @PlannedSizeid Int 
Declare @uomid int 
Declare @unitid int 
Declare @Ordid int 
Declare @OrdDetid int 
Declare @OrdJobid int 
Declare @Processid int 
Declare @Styleid int 
Declare @Compid int 
Declare @Rate numeric(12,2) 
Declare @RecQty numeric(14,3) 
Declare @SecQty numeric(14,3) 
Declare @ProgNo varchar(20) 
Declare @Lotno varchar(20) 
Declare @ProdPrgno varchar(20) 
Declare @job_ord_no varchar(20) 
Declare @RecNo varchar(20) 
Declare @RecDate datetime 
Declare @OrderType char(1) 
Declare @Markuprate Numeric(12,2) 
Declare @stocktype Char(1) 
Declare @storeunitid int 
Declare @Ty char(1)
 
set @Ty =''
 
Select @OrderType=Case When OrderType ='S' then 'S' When OrderType ='G' then 'G' When OrderType ='L' then 'L' 
else 'P' End, 
@StockType= case when Isnull(Prm.Storeunitid,0)<>0 then 'S' Else 'U' End , 
@storeunitid = Prm.Storeunitid from Inserted ins 
inner join Process_Recpt_Det prd on prd.Proc_Recpt_detid= ins.Proc_Recpt_Detid 
inner join Process_Recpt_Mas prm on prm.Proc_Recpt_masid = prd.Proc_Recpt_masid 
 
Select @Rate=isnull(prd.Rate,0), @Ordid=Prd.Processordid, @itemid= prd.Itemid, @Colorid= prd.Colorid , 
@Sizeid=case When (prd.IssuedSizeID is null or prd.IssuedSizeid=0) then prd.Sizeid Else prd.IssuedSizeid End ,
@PlannedSizeid = isnull(pod.PlannedSizeID,0), 
@RecSizeid = prd.Sizeid, @RecQty=Ins.Received_Qty, @SecQty= Ins.Sec_Qty, 
@Lotno= isnull(Ins.LotNo,''), @ProdPrgno= Ins.ProdPrgno, @job_ord_no=Ins.job_ord_no, 
@MarkupRate = isnull(prd.OPMarkup_Rate,0), 
@OrdDetid=Ins.ProcessOrdDetid, @Ordjobid= Ins.ProcessOrdjobdetid 
from Process_Recpt_Det prd, Process_Ord_Det pod, Inserted Ins 
Where ins.Proc_Recpt_Detid = prd.Proc_Recpt_Detid and pod.processorddetid = Ins.ProcessOrdDetid 
and Prd.ProcessOrdID = Pod.processordid and pod.Inp_Op = 'O' 
 
Update Prod_prg_det Set Receipt_Qty= Isnull(Receipt_Qty,0) + @RecQty from Prod_prg_det ppd, Prod_prg_mas ppm 
Where ppm.ProdPrgid=ppd.Prodprgid and ppd.Itemid=@Itemid and ppd.Colorid =@Colorid and ppd.Sizeid =@PlannedSizeid 
and ppd.InorOut='O' and ppm.Prodprgno=@Prodprgno and ppm.Job_ord_no=@job_ord_no 
 
If @PlannedSizeid <> @RecSizeID 
Begin 
Update Prod_prg_det Set AltItem = 'Y' from Prod_prg_det ppd, Prod_prg_mas ppm 
Where ppm.ProdPrgid=ppd.Prodprgid and ppd.Itemid=@Itemid and ppd.Colorid =@Colorid and ppd.Sizeid=@PlannedSizeid 
and ppd.InorOut='O' and ppm.Prodprgno=@Prodprgno and ppm.Job_ord_no=@job_ord_no 
End 
 
Update Process_Ord_Det Set received_qty=isnull(received_qty,0) + @RecQty Where processorddetid=@OrdDetid 
and Itemid=@itemid and Colorid=@Colorid and isnull(PlannedSizeid,0) = @PlannedSizeId 
and inp_op='O' 
 
Update Process_Ord_JobDet Set received_qty=isnull(received_qty,0) + @RecQty Where ProcessOrddetid=@OrdDetid 
and ProcessJobDetid=@Ordjobid 
 
Select @uomid= bas_unit from item where itemid=@itemid 
 
Select @RecNo=proc_recpt_no, @Recdate= proc_recpt_date 
from Process_Recpt_Mas prm, Process_Recpt_Det prd, Inserted Ins 
Where prm.proc_recpt_masid = prd.proc_recpt_masid and 
prd.Proc_Recpt_Detid = ins.Proc_Recpt_Detid 
 
Select @Compid=Companyid, @unitid= companyunitid, @Processid=Processid, @Supplierid=Processorid , @Ty =ProcessorType
from Process_Ord_Mas Where processordid=@Ordid 
Select @Styleid=Styleid from job_ord_mas where job_ord_no=@job_ord_no 

IF @OrderType = 'L' and isnull(@storeunitid,0) = 0
Begin
Return
End 
 
if not Exists(Select * from Itemstock Where Transno=@Recno and Itemid=@Itemid and Colorid=@Colorid 
and Sizeid =@RecSizeid and isnull(lotno,'')=@lotno and joborderno=@job_ord_no) 
 Begin 
 Insert into ItemStock (Unitid, Itemid, Colorid, Sizeid, qty, Rate, joborderno, TransType,
 Transno, Alloted, ItemCat, Processid, SQty, lotno, BalQty, PurOrProd, 
 TransDate,StockDate, Companyid, Supplierid, uomid, Styleid, unit_or_other, StockType, Markup_Rate,Storeunitid) 
 Values (@unitid, @itemid, @colorid, @RecSizeid, @RecQty, @Rate, @job_ord_no,'PRN',@RecNo, '0',
 @OrderType, @Processid, @SecQty, @lotno, @RecQty,'RR', 
 @RecDate,@RecDate,@Compid, @Supplierid, @uomid, @Styleid,@Ty,@StockType, @MarkupRate,@storeunitid) 
 End 
Else 
 Begin 
 Update ItemStock set qty = x.Received_Qty, BalQty = x.Received_Qty - Alloted, Rate=@Rate, 
 lotno=@lotno, Markup_Rate =@MarkupRate ,StockType=@StockType ,Storeunitid=@storeunitid,unit_or_other=@Ty
 from ITemstock it 
 inner join (select rmas.proc_recpt_no, rdet.itemid, rdet.colorid, rdet.sizeid, 
 rjdet.job_ord_no, rjdet.lotno, sum(rjdet.Received_Qty) as Received_Qty 
 from Process_Recpt_Mas rmas 
 inner join Process_Recpt_Det rdet on rdet.proc_recpt_masid = rmas.proc_recpt_masid 
 inner join Process_Recpt_JobDet rjdet on rjdet.proc_recpt_detid = rdet.proc_recpt_detid 
 group by rmas.proc_recpt_no, rdet.itemid, rdet.colorid, rdet.sizeid, 
 rjdet.job_ord_no, rjdet.lotno 
 )x on x.proc_recpt_no = it.transno and x.itemid = it.itemid and x.colorid = it.colorid 
 and x.sizeid = it.sizeid and x.job_ord_no = it.joborderno and x.lotno = it.lotno 
 Where it.Transno=@Recno and it.Itemid=@Itemid and it.Colorid=@Colorid and it.Sizeid=@RecSizeid 
 and isnull(it.lotno,'')=@lotno and it.jobOrderno=@job_ord_no 
 End  
 
 IF(@@Error >0 )
 Begin
	RAISERROR('Error in Stock Insertion',16,1)
 End
GO






CREATE TRIGGER [dbo].[DeleterocReceipt] ON [dbo].[Process_Recpt_JobDet] 
FOR DELETE
AS

Declare @Itemid int
Declare @Colorid int
Declare @Sizeid int
Declare @PlanSizeid int
Declare @Ordid int
Declare @OrdDetid int
Declare @OrdJobid int
Declare @RecQty numeric(14,3)
Declare @SecQty numeric(14,3)
Declare @ProgNo varchar(20)
Declare @Lotno varchar(20)
Declare @ProdPrgno varchar(20)
Declare @job_ord_no varchar(20)
Declare @RecNo varchar(20)
Declare @RecDate datetime


Declare PR Cursor  for Select prd.itemid, prd.Colorid, prd.Sizeid, prd.ProcessOrdid, del.ProcessOrdDetid,
 Del.ProcessOrdJobDetid, Del.Job_Ord_No, Del.ProdPrgNo,
Del.Received_Qty  from Process_Recpt_det prd, Deleted Del Where prd.Proc_Recpt_detid=Del.Proc_Recpt_detid
Open PR
Fetch next from PR into @itemid, @Colorid, @Sizeid, @Ordid, @OrdDetid, @OrdJobid, @Job_Ord_no, @Prodprgno, @RecQty
While @@Fetch_status=0
Begin

	Select @PlanSizeid=Case When (pod.plannedSizeid is null or pod.plannedSizeid=0) then pod.Sizeid else pod.plannedSizeid End 
        from Process_Ord_Det pod Where processorddetid=@OrdDetid

	Update Prod_prg_det Set Receipt_Qty= Isnull(Receipt_Qty,0) - @RecQty  from Prod_prg_det ppd, Prod_prg_mas ppm
	Where ppm.ProdPrgid=ppd.Prodprgid and ppd.Itemid=@Itemid and ppd.Colorid =@Colorid  and ppd.Sizeid=@PlanSizeid
	and ppd.InorOut='O' and ppm.Prodprgno=@Prodprgno and ppm.Job_ord_no=@job_ord_no

	Update Process_Ord_Det  Set received_qty=isnull(received_qty,0) - @RecQty  Where processorddetid=@OrdDetid

	Update Process_Ord_JobDet Set received_qty=isnull(received_qty,0) - @RecQty  Where  ProcessOrddetid=@OrdDetid 
	and ProcessJobDetid=@Ordjobid

	Select  @RecNo=proc_recpt_no  from Process_Recpt_Mas prm, Process_Recpt_Det prd, Deleted Del  Where prm.proc_recpt_masid = prd.proc_recpt_masid and 
	prd.Proc_Recpt_Detid = Del.Proc_Recpt_Detid

Fetch next from PR into @itemid, @Colorid, @Sizeid, @Ordid, @OrdDetid, @OrdJobid, @Job_Ord_no, @Prodprgno, @RecQty
End
Close PR
DeAllocate PR
GO



