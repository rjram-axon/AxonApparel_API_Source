CREATE TABLE [dbo].[Process_Qlty_Jobdet]
(
	[Proc_qlty_jobDetid] [int] IDENTITY(1,1) NOT NULL,
	[Proc_qlty_Masid] [int] NULL,
	[Proc_qlty_Detid] [int] NULL,
	[Proc_Recpt_jobDetid] [int] NULL,
	[DebitQty] [numeric](12, 3) NULL DEFAULT (0.00),
	[AcptQty] [numeric](12, 3) NULL DEFAULT (0.00),
	[DbtProcessId] [int] NULL,
	[DbtProcessorId] [int] NULL, 
    CONSTRAINT [PK_Process_Qlty_Jobdet] PRIMARY KEY ([Proc_qlty_jobDetid]), 
    CONSTRAINT [FK_Process_Qlty_Jobdet_Process_Qlty_Mas] FOREIGN KEY ([Proc_qlty_Masid]) REFERENCES [Process_Qlty_Mas]([Proc_qlty_Masid]),
    CONSTRAINT [FK_Process_Qlty_Jobdet_Process_Qlty_det] FOREIGN KEY ([Proc_qlty_detid]) REFERENCES [Process_Qlty_det]([Proc_qlty_detid]),
    CONSTRAINT [FK_Process_Qlty_Jobdet_DbtProcessId] FOREIGN KEY ([DbtProcessId]) REFERENCES [Process]([Processid]),
	CONSTRAINT [FK_Process_Qlty_Jobdet_DbtProcessorId] FOREIGN KEY ([DbtProcessorId]) REFERENCES [Supplier]([SupplierId]),
)
