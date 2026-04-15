package com.techstore.manager;

import com.techstore.manager.model.Category;
import com.techstore.manager.model.Product;
import com.techstore.manager.repository.CategoryRepository;
import com.techstore.manager.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TechStoreMappingTests {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testCategoryAndProductRelationship() {
        // 1. Create and save a Category
        Category category = new Category();
        category.setName("Gaming");
        Category savedCategory = categoryRepository.save(category);
        assertThat(savedCategory.getId()).isNotNull();

        // 2. Create and save a Product linked to that category
        Product product = new Product();
        product.setName("RTX 4070 Ti");
        product.setPrice(799.99);
        product.setCantid(10);
        product.setCategory(savedCategory);
        
        Product savedProduct = productRepository.save(product);
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getCategory().getName()).isEqualTo("Gaming");
        assertThat(savedProduct.getCreated()).isNotNull(); // Verification of auto-generation
    }
}
