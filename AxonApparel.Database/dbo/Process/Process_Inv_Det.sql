CREATE TABLE [dbo].[Process_Inv_Det]
(
	[Process_InvDetid] [int] IDENTITY(1,1) NOT NULL, 
    [Process_Invid] [int] NULL,	
	[Proc_Recpt_Detid] [int] NULL,
	[Proc_Recpt_masid] [int] NULL,
	[Invoice_Qty] [numeric](14, 3) NULL,
	[Rate] [numeric](15, 5) NULL,
	[Amount] [numeric](15, 5) NULL,
	[closed] [varchar](1) NOT NULL DEFAULT ('N'),
	[IPMarkup_rate] [numeric](15, 5) NULL DEFAULT (0),
	[OPMarkup_Rate] [numeric](15, 5) NULL DEFAULT (0),
	[IsSecQty] [varchar](1) NOT NULL DEFAULT ('N'),
    CONSTRAINT [PK_Process_Inv_Det] PRIMARY KEY ([Process_InvDetid]), 
    CONSTRAINT [FK_Process_Inv_Det_Process_Inv_Mas] FOREIGN KEY ([Process_Invid]) REFERENCES [Process_Inv_Mas]([Process_Invid]),
	CONSTRAINT [FK_Process_Inv_Det_Process_recpt_Det] FOREIGN KEY ([Proc_Recpt_Detid]) REFERENCES [Process_recpt_Det]([Proc_Recpt_Detid]), 
	CONSTRAINT [FK_Process_Inv_Det_Process_recpt_Mas] FOREIGN KEY ([Proc_Recpt_Masid]) REFERENCES [Process_recpt_Mas]([Proc_Recpt_Masid]), 
    CONSTRAINT [CK_Process_Inv_Det_IsSecQty] CHECK (([IsSecQty] = 'N' or [IsSecQty] = 'Y'))
)
