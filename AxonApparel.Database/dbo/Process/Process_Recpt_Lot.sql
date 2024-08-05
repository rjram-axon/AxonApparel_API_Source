CREATE TABLE [dbo].[Process_Recpt_Lot]
(
	[proc_recpt_lotid] [int] IDENTITY(1,1) NOT NULL,
	[proc_recpt_detid] [int] NULL,
	[proc_recpt_jobdetid] [int] NULL,
	[proc_ord_jobdetid] [int] NULL,
	[lotquantity] [numeric](14, 3) NULL,
	[lotno] [tinyint] NULL,
	[LotSecQty] [numeric](12, 2) NULL, 
    CONSTRAINT [FK_Process_Recpt_Lot_Process_Ord_JobDet] FOREIGN KEY ([proc_ord_jobdetid]) REFERENCES [Process_Ord_JobDet]([ProcessJobDetid])
	
)
