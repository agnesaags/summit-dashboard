"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, Input, Button, Modal, Form,
  InputNumber, Space, Typography, Pagination, message
} from "antd";

interface Product {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_category?: string;
  product_image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // Fetch produk dari API internal
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    } catch {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(debounce);
  }, [search, page]);

  // Kolom tabel
  const columns = [
    { title: "Title", dataIndex: "product_title" },
    { title: "Price", dataIndex: "product_price", render: (p: number) => `Rp ${p}` },
    { title: "Category", dataIndex: "product_category" },
    { title: "Actions", render: (_: any, record: Product) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      )
    },
  ];

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    form.setFieldsValue(p);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) await axios.put("/api/product", { ...editingProduct, ...values });
      else await axios.post("/api/product", values);
      message.success("Saved!");
      setIsModalOpen(false);
      fetchProducts();
    } catch {
      message.error("Failed to save");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>Product Management</Typography.Title>

      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Create</Button>
      </Space>

      <Table dataSource={products} columns={columns} loading={loading} rowKey="product_id" />
      <Pagination current={page} total={100} onChange={(p) => setPage(p)} />

      {/* MODAL FORM */}
      <Modal
        title={editingProduct ? "Edit Product" : "Create Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingProduct(null);
        }}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="product_title" label="Product Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="product_price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="product_category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="product_description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="product_image" label="Image URL">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
