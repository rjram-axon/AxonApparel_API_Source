CREATE TABLE [dbo].[Process_Qlty_DrCr]
(
	[Proc_Qlty_DrCrid] [int] IDENTITY(1,1) NOT NULL,
	[Proc_qlty_Masid] [int] NULL,
	[QltyRemarks] [varchar](100) NULL,
	[Amount] [numeric](15, 5) NULL DEFAULT (0.00), 
    CONSTRAINT [PK_Process_Qlty_DrCr] PRIMARY KEY ([Proc_Qlty_DrCrid]), 
    CONSTRAINT [FK_Process_Qlty_DrCr_Process_qlty_Mas] FOREIGN KEY ([Proc_qlty_Masid]) REFERENCES [Process_qlty_Mas]([Proc_qlty_Masid])
)
